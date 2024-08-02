import { createEffect, createSignal, onMount } from "solid-js"

import styles from "./range.module.css"
import stores from "../datasets/stores"
import { RangeProps } from "../../assets/props";



export function Range(props: RangeProps) {
    const [store, setStore] = stores;
    const [units, setUnits] = createSignal(props.units || "")
    const [value, setValue] = createSignal(props.defaultValue || 0)
    const [active, setActive] = createSignal(false)
    const [minimum, setMinimum] = createSignal(props.minimum || 0)
    const [maximum, setMaximum] = createSignal(props.maximum || 0)
    const [maxUnits, setMaxUnits] = createSignal(props.maximumUnits || "")
    const [minUnits, setMinUnits] = createSignal(props.minimumUnits || "" )


    store().values[props.internalId] = value;

    onMount(() => {
        setActive(true)
    })

    function CurrentValue() {

        return (
            <div>
                <input
                    type="text"
                    class={styles.current}
                    onload={() => {
                        setActive(true)
                    }}
                    maxlength={2}
                    onFocusIn={(val) => {
                        val.target.placeholder = ""
                    }}
                    onFocusOut={(val) => {
                        if (val.target.value === "" && val.target.placeholder === "") {
                            if (props.units) {
                                val.target.placeholder = props.defaultValue + props.units
                                setMaximum(props.maximum)
                            }
                        }
                    }}
                    placeholder={value() + units()} onInput={(val) => {
                        val.target.value = val.target.value.replace(/[^0-9]/, "");
                        setValue(+val.target.value)
                        props.processing?.(value, setUnits, props)
                        if (value() > maximum()) {
                            setMaximum(value())
                            setMaxUnits(units())
                        }
                        else if (value() <= 30) {
                            setMaximum(30)
                            setMaxUnits(props.maximumUnits)
                        }
                    }}
                    onChange={(val) => {
                        val.target.placeholder = value() + units()
                        val.target.value = "";
                    }}></input>
            </div>
        )
    }


    return (
        <>
            <div class={styles.range}>
                <p class={styles.title}>
                    {props.title}
                </p>
                <CurrentValue />
                <div class={styles.container}>
                    <p class={styles.minmax}>
                        {minimum() + minUnits()}
                    </p>
                    <input
                        type="range"
                        step={props.step}
                        class={styles.input}
                        min={minimum()}
                        max={maximum()}
                        value={value()}
                        onInput={(val) => {
                            setValue(+val.target.value);
                            props.processing?.(value, setUnits, props)
                        }} />

                    <p class={styles.minmax}>
                        {maximum() + maxUnits()}
                    </p>
                </div>
                <p class={styles.description}>
                    {props.description}
                </p>
            </div>
        </>
    )
}

