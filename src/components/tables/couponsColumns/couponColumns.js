import { ColumnsFilter } from "../TableComponents/ColumnsFilter"


export const COUPON_COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Filter :ColumnsFilter,
        
        
    },
    {
        Header: 'Title',        
        accessor:'title',
        Filter :ColumnsFilter

    },
    {
        Header: 'Description',      
        accessor:'description',
        Filter :ColumnsFilter
    },
    {
        Header: 'Category',      
        accessor:'category',
        Filter :ColumnsFilter
    },
    {
        Header: 'Image',      
        accessor:'image',
        Filter :ColumnsFilter
    },
    {
        Header: 'Start Date',      
        accessor:'startDate',
        Filter :ColumnsFilter
    },
    {
        Header: 'End Date',      
        accessor:'endDate',
        Filter :ColumnsFilter
    },
    {
        Header: 'Price',      
        accessor:'price',
        Filter :ColumnsFilter
    },
   
]