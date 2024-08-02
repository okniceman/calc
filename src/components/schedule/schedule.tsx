import stores from "../datasets/stores"

export default () => {

    const [store, setStore] = stores;

    

    function ScheduleItem() {
        return (
            <div>
                <span>
                    дата
                </span>
                <span>
                    платеж собственный
                </span>
                <span>
                    по процентам
                </span>
                <span>
                    осталось
                </span>
            </div>
        )
    }



    return (
        <>
            <div class="schedule">
                <ScheduleItem />
            </div>
        </>
    )
}