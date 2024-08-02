import { createEffect, createSignal, onMount } from "solid-js"
import styles from "./field.module.css"
import stores from "../datasets/stores";

const MAX_LENGHT = 16;



const [store, setStore] = stores;
export default (props: any) => {

    const [value, setValue] = createSignal(props.defaultValue);


    store().values[props.internalId] = value;


    return (
        <div class={styles.field}>
            <p class={styles.title}>
                {props.title}
            </p>
            <input class={styles.input}
                type="text"
                placeholder={props.defaultValue}
                maxlength={MAX_LENGHT}
                onInput={(val) => {
                    val.target.value = val.target.value.replace(/[^0-9]/, "");
                    setValue(+val.target.value);
                }
                } />
            <p class={styles.description}>
                {props.description}
            </p>
        </div>
    )
}