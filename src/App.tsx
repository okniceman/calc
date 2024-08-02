import { type Component } from 'solid-js';
import { Range } from './components/range/range';
import styles from './App.module.css';
import Field from './components/field/field';
import Toggle from './components/toggle/toggle';
import Chart from './components/chart/chart';
import props from './assets/props'
import stores from './components/datasets/stores';


const App: Component = () => {
  const [store, setStore] = stores;


  return (
    <>
      <div class={styles.app}>
        <Field {...props.price} />
        <Field {...props.firstPay} />
        <Range {...props.rate} />
        <Range {...props.term} />
        <Toggle />
        <Chart />
      </div>
    </>
  );
};

export default App;
