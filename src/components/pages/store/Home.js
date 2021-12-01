import React,{useEffect,useState,useMemo} from 'react'
import { Switch,Route } from 'react-router-dom'
import MainService from '../../../servicies/MainService'
import Categories from './categories/Categories'
import CategoryCoupons from './mainStore/coupons/CategoryCoupons'
import MainStore from './mainStore/MainStore'

export default function Home() {

    const [coupons,setCoupons]=useState();


    const showCategoryPage=(category,coupons)=>{
        return(
            <Switch>
                <Route path='/store/category/:category'>
                    <CategoryCoupons coupons={category} coupons={coupons}/>
                </Route>
            </Switch>
        )
    }

    async function fetchCoupons(){
        let response = await MainService.getAllCoupons();
            setCoupons(response.date)
    }
    

    useEffect(() => {
       fetchCoupons();
    }, [])
    return (
        <>
       
        <Categories/>
        <MainStore coupons={useMemo(()=>coupons,[])} showCategoryPage={(category,coupons)=>showCategoryPage(category)}/>
            
        </>
    )
}
