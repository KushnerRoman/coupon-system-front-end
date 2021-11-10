import { ColumnsFilter } from "../TableComponents/ColumnsFilter"


export const CUSTOMER_COLUMNS = [
    {
        Header: 'ID',
        Footer:'ID',
        accessor: 'id',
        Filter :ColumnsFilter
    },
    {
        Header: 'First Name',
        Footer:'First Name',
        accessor:'firstName',
        Filter :ColumnsFilter

    },
    {
        Header: 'Last Name',
        Footer:'Last Name',
        accessor:'lastName',
        Filter :ColumnsFilter
    },
    {
        Header: 'Email',
        Footer:'Email',
        accessor:'email',
        Filter :ColumnsFilter
    }
    
   
]