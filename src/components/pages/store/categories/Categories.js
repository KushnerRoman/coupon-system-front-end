import React from 'react'
import  './Categories.css'
import foodImage from '../../../../images/categories/category-food.jpg'
import carImage from '../../../../images/categories/category-car.jpg'
import gadgersImage from '../../../../images/categories/category-gadgets.jpg'
import festivalsImage from '../../../../images/categories/category-gestival.jpg'
import hatsImage from '../../../../images/categories/category-hats.jpg'
import mobileImage from '../../../../images/categories/category-mobile.jpg'
import outdoorImage from '../../../../images/categories/category-outdoor.jpg'
import eventsImage from '../../../../images/categories/category-events.jpg'
import clothesImage from '../../../../images/categories/category-clothes.jpg'
export default function Categories() {
    const foodStyle={
        backgroundImage: 'url(%{foodImage})'
    }
    return (
        <section className="categories">
                <div className="category-item" style={{ backgroundImage: `url(${foodImage})` }} onClick={()=>console.log('hello')}>
                    <div className="category-item-inner">
                         <div>

                         FOOD
                         </div>
                    </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${gadgersImage})` }}>
                <div className="category-item-inner">
                          <div>
                             
                        ELECTRICITY
                         </div>
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${festivalsImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                        FESTIVALS
                             </div>
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${eventsImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                        EVENTS
                             </div>
                         
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${mobileImage})` }}>
                <div className="category-item-inner">
                <div>
                        MOBILE
                             
                             </div>
                         
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${clothesImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                        CLOTHES
                             </div>
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${carImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                        CARS
                             </div>
                         </div>
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${outdoorImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                OUTDOOR
                             </div>
                         </div>
                        
                </div>
                <div className="category-item" style={{ backgroundImage: `url(${hatsImage})` }}>
                <div className="category-item-inner">
                <div>
                             
                HATS
                             </div>
                         </div>
                        
                </div>
        </section>
    )
}
