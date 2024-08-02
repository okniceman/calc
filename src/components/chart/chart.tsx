import Chart from 'chart.js/auto'
import { createEffect, createSignal, onMount, untrack } from "solid-js";
import stores from '../datasets/stores'
import styles from './chart.module.css'

export default () => {
    const [store, setStore] = stores;
    const [chart, setChart] = createSignal()
    const [ctx, setCtx] = createSignal(<canvas></canvas>)

    onMount(() => {
        setCtx(document.getElementById("chartID"))
        setChart(new Chart(ctx(), {
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Основной платеж",
                        data: []
                    },
                    {
                        label: "Платеж по процентам",
                        data: []
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        position: "top"
                    },
                    title: {
                        display: true,
                        text:
                            ""
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            drawTicks: false
                        }
                    },
                    y: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            drawTicks: false
                        },
                        stacked: true
                    }
                }
            }
        })

        )
    }
    )



    createEffect(() => {

        const price = store().values.price();
        const firstPay = store().values.firstPay();
        const rate = store().values.rate();
        const term = store().values.term();



        const YEAR = new Date().getFullYear();
        const MONTH = new Date().getMonth();

        let G = rate * 0.01;
        let S = firstPay < 100 ? price - price * G : price - rate;
        let T = term * 12;

        const payments = [];
        if (store().values.variant() === "Аннуитетный") {
            let monthlyPayment = (G / 12) * (1 / (1 - (1 + G / 12) ** -T)) * S;
            for (let i = 0; i != T; i++) {
                const date = new Date(YEAR, MONTH + i);

                const pm = Number(monthlyPayment.toFixed(2));
                const percentage = Number((S * (G / 12)).toFixed(2));
                const principal = Number((pm - percentage).toFixed(2));
                const balance = (S - principal).toFixed(2);
                const paymentComposition = {
                    PM: pm,
                    percentage: percentage,
                    principal: principal,
                    balance: balance,
                    date: date.toLocaleDateString("ru-RU", {
                        month: "long",
                        year: "numeric"
                    })
                };
                payments.push(paymentComposition);
                S = S - paymentComposition.principal;
            }
        } else {
            const principal = S / T;
            for (let i = 0; i != T; i++) {
                const date = new Date(YEAR, MONTH + i);
                const dateForDays = new Date(YEAR, MONTH + i, 0);
                const days = dateForDays.getDate();
                const percentage = (S * G * days) / 365;
                const balance = S - principal;
                const pm = principal + percentage;
                
                const paymentComposition = {
                    PM: pm.toFixed(2),
                    percentage: percentage.toFixed(2),
                    principal: Number(principal.toFixed(2)),
                    balance: balance.toFixed(2),
                    date: date.toLocaleDateString("ru-RU", {
                        month: "long",
                        year: "numeric"
                    })
                };

                payments.push(paymentComposition);
                S = S - paymentComposition.principal;
            }
        }


        const dataset = {
            labels: payments.map((row) => row.date),
            datasets: [
                {
                    label: "Основной платеж",
                    data: payments.map((row) => row.principal)
                },
                {
                    label: "Платеж по процентам",
                    data: payments.map((row) => row.percentage)
                }
            ]
        }
            store().payments = payments;
            const mp = store().values.variant() === "Аннуитетный" 
            ? `Ежемесячный платеж: ${payments[0].PM}`
            : `Ежемесячный платеж: ${payments[0].PM} ... ${payments[payments.length - 1].PM}`
            chart().options.plugins.title.text = mp
            chart().data = dataset;
            chart().update();

    })




    return (
        <div class={styles.chart}>
            <canvas id="chartID">
            </canvas>
        </div>
    )
}