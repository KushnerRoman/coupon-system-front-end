import { ColumnsFilter } from "../TableComponents/ColumnsFilter"


export const COMPANY_COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Filter :ColumnsFilter,
        
    },
    {
        Header: 'Name',        
        accessor:'name',
        Filter :ColumnsFilter

    },
    {
        Header: 'Email',      
        accessor:'email',
        Filter :ColumnsFilter
    }
   
]