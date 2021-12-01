import { ColumnsFilter } from "../TableComponents/ColumnsFilter"


export const COUPON_COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Filter :ColumnsFilter,
        width:75
        
        
    },
    {
        Header: 'Title',        
        accessor:'title',
        Filter :ColumnsFilter,
        width:200,
    },
    {
        Header: 'Description',      
        accessor:'description',
        Filter :ColumnsFilter,
        width:300
    },
    {
        Header: 'Category',      
        accessor:'category',
        Filter :ColumnsFilter,
        width:130
    },
    {
        Header: 'Image',      
        accessor:'image',
        Filter :ColumnsFilter,
        width:200
    },
    {
        Header: 'Start Date',      
        accessor:'startDate',
        Filter :ColumnsFilter,
        width:130
    },
    {
        Header: 'End Date',      
        accessor:'endDate',
        Filter :ColumnsFilter,
        width:130
    },
    {
        Header: 'Price',      
        accessor:'price',
        Filter :ColumnsFilter,
        width:120
    },
   
]