import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

function CompanyPage() {

const params = useParams()
const[menuitems,setMenuitems] = useState([])
const[categories,setCategories] = useState([])
const[menus,setMenus] = useState([])
const[category_id,setCategory_id] = useState(null)
const[menu_id,setMenu_id] = useState(null)




    useEffect(() => {
    getData()
    }, [])

   async function getData(){
        try {

            const response = await axios.get('/frontend/menu-item/'+params.id)
            console.log(response.data)
            setCategories(response.data.categories)
            setMenus(response.data.menues)
            setMenuitems(response.data.menuitems)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    useEffect(()=>{
        if(category_id || menu_id){
            changeFilter()
        }
    },[category_id,menu_id])

   async function changeFilter(){
        try {
            const data={
                category_id,
                menu_id,
                company_id:params.id
            }
            const response = await axios.post('/frontend/filter',data)
            console.log(response.data)
            setMenuitems(response.data)
        } catch (error) {
            console.log(error.request.response)
        }
    }
    
  return (
    <div className='category-page-section'>
        <div className='category-page-wrapper row'>
            <div className='col-md-3 company-filter-section'>
            <div className='filter-section-title'>All Stories</div>
            <div className='product-sorting'>
                <div className='sort-title'>Sort</div>
                <div className='d-flex align-items-center'>
                    <div className="filter-radio">
                        <input type="radio"></input>
                        
                    </div>
                    <div className='filter-sort-name'>Picked for you</div>
                </div>
            </div>
            <div className='product-sorting'>
                <div className='sort-title'>Categories</div>
                {categories.map(category=>{
                    return(
                        <div className='d-flex align-items-center'>
                            <input type="radio" name="category" id={`radio-btn-${category._id}`} onChange={()=>setCategory_id(category._id)}></input>
                            {/* <button type="submit">hello</button> */}
                            <label type="submit"  for={`#radio-btn-${category._id}`}>hello</label>
                            <div className='filter-sort-name'>{category.name}</div>
                        </div>
                    )
                })}
               
            </div>

            <div className='product-sorting'>
                <div className='sort-title'>Menues</div>
                {menus.map(menu=>{
                    return(
                        <div className='d-flex align-items-center'>
                            <input type="radio" name="menu" id={`radio-btn-${menu._id}`} onChange={(e)=>setMenu_id(menu._id)}></input>
                            <label type="submit" for={`#radio-btn-${menu._id}`}>hello</label>
                           
                    <div className='filter-sort-name'>{menu.name}</div>
                </div>
                    )
                })}
               
            </div>
            </div>
            <div className='col-md-9'>
                <div className='company-product-section'>
                    <div className='company-product-header d-flex justify-content-between align-items-center'>
                        <div className='company-product-title'>National brands</div>
                        <div className='company-product-slider'>
                            <div className='slider-right'><i class="fa-solid fa-arrow-left"></i></div>
                            <div className='slider-left'><i class="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                    <div className='company-product-container row'>
                    {menuitems.map(item=>{
                        return(
                            <div className='col-md-3'>
                             <div className='single-product'>
                            <Link className='product-image' to={`/product-detail/${item._id}`}>
                                <img src={item.image} className='img-fluid'/>
                            </Link>
                            <div className='single-product-detail'>
                                <div className='product-detail-name text-capitalize'>{item.name}</div>
                                <div className='product-detail-price'>${item.price} Delivery Fee• 10–20 min</div>
                            </div>
                        </div>
                    </div>
                        )

                    })}
                    
                   

                    </div>
                </div>

                <div className='company-product-section'>
                    <div className='company-product-header d-flex justify-content-between align-items-center'>
                        <div className='company-product-title'>Today's Offer</div>
                        <div className='company-product-slider'>
                            <div className='slider-right'><i class="fa-solid fa-arrow-left"></i></div>
                            <div className='slider-left'><i class="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                    <div className='company-product-container row'>
                    <div className='col-md-3'>
                        <div className='single-product'>
                            <div className='product-image position-relative'>
                                <img src="https://natashaskitchen.com/wp-content/uploads/2020/06/Chicken-Sandwich-7.jpg" className='img-fluid'/>
                                <div className='offer-tag'>Buy 1, Get 1 Free</div>
                                <div className='product-wishlist'><i class="fa-regular fa-heart"></i></div>
                            </div>
                            <div className='single-product-detail'>
                                <div className='product-detail-name'>Starbucks (100 Williams Street)</div>
                                <div className='product-detail-price'>$2.49 Delivery Fee• 10–20 min</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='single-product'>
                            <div className='product-image'>
                                <img src="https://natashaskitchen.com/wp-content/uploads/2020/06/Chicken-Sandwich-7.jpg" className='img-fluid'/>
                                <div className='offer-tag'>Buy 1, Get 1 Free</div>
                            </div>
                            <div className='single-product-detail'>
                                <div className='product-detail-name'>Starbucks (100 Williams Street)</div>
                                <div className='product-detail-price'>$2.49 Delivery Fee• 10–20 min</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='single-product'>
                            <div className='product-image'>
                                <img src="https://natashaskitchen.com/wp-content/uploads/2020/06/Chicken-Sandwich-7.jpg" className='img-fluid'/>
                            </div>
                            <div className='single-product-detail'>
                                <div className='product-detail-name'>Starbucks (100 Williams Street)</div>
                                <div className='product-detail-price'>$2.49 Delivery Fee• 10–20 min</div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='single-product'>
                            <div className='product-image'>
                                <img src="https://natashaskitchen.com/wp-content/uploads/2020/06/Chicken-Sandwich-7.jpg" className='img-fluid'/>
                            </div>
                            <div className='single-product-detail'>
                                <div className='product-detail-name'>Starbucks (100 Williams Street)</div>
                                <div className='product-detail-price'>$2.49 Delivery Fee• 10–20 min</div>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyPage