import { JSX, createEffect, createSignal } from "solid-js"
import styles from './toggle.module.css';
import stores from "../datasets/stores";

export default (props: any) => {

    const [store, setStore] = stores;
    const [current, setCurrent] = createSignal("Аннуитетный")//temp

    store().values.variant = current;

    function Variant(props: any) {


        return (
            <div
                onClick={() => {
                    setCurrent(props.variant)
                }}
                class={current() === props.variant ? styles.active : styles.variant}
            >
                <p>
                    {props.variant}
                </p>
            </div>
        )
    }

    return (
        <div class={styles.toggle}>
            <Variant variant="Аннуитетный" />
            <Variant variant="Дифференцированный" />
        </div>
    )
}