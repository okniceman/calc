export interface FieldProps {
    title: string;
    description: string;
    defaultValue: number;
    internalId: string;
}

export interface RangeProps {
    minimumUnits: string,
    minimum: number;
    maximumUnits: string,
    maximum: number;
    value?: number | unknown;
    defaultValue: number;
    units?: string;
    description: string;
    title: string | null;
    step?: number;
    internalId: string;
    processing?: Function;

}

interface Properties {
    price: FieldProps;
    firstPay: FieldProps;
    rate: RangeProps;
    term: RangeProps;

}
const Properties: Properties = {
    price: {
        title: "Стоимость",
        description:"Полная стоимость приобретаемого помещения",
        defaultValue: 5000000,
        internalId: "price", 
    },
    firstPay: {
        title:"Первый взнос",
        description:"Размер первого взноса по кредиту",
        defaultValue:3500000,
        internalId:"firstPay"
    },
    rate: {
        minimumUnits: " %",
        maximumUnits: " %",
        minimum:0.1,
        maximum:30,
        defaultValue:15,
        units:" %",
        description:"Укажите ставку ипотеки или введите вручную",
        title:null,
        internalId: "rate",
        step: 0.1,
    },
    term: {
        minimum: 1,
        minimumUnits: " Год",
        maximum:30,
        maximumUnits: " Лет",
        defaultValue:20,
        units: " Лет",
        description:"Срок ипотеки",
        title: null,
        internalId: "term",
        processing (value: Function, setUnits: Function, props: any = undefined) {
            setUnits(
                value() > 10 && value() < 20 ? " Лет" :
                value() % 10 === 1 ? " Год" :
                value() % 10 === 0 ? " Лет" :
                value() % 10 < 5 ? " Года" : " Лет"
            )
        }
    }
};


export default Properties