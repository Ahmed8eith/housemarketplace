import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/._deleteIcon.svg'
import bedIcon from '../assets/svg/._bedIcon.svg'
import bathTub from '../assets/svg/._bathtubIcon.svg'


function ListingItem({listing, id, onDelete}) {
  return (
   <li className='categoryListing'>
    <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
    <img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg'/>
    
    <div className="categoryLisingDetails">
        <p className="categoryListingLocation">{listing.location}</p>
        <p className="categoryListingName">{listing.name}</p>
        <p className="categoryListingPrice">${listing.offer? listing.discountedPrice : listing.regularPrice}
            {listing.type==='rent' && '/Month'}
        </p>
        <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="Bed" />
            <p className='categoryListingInfoText'>
                {listing.bedrooms>1? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <img src={bathTub} alt="bath" />
            <p className='categoryListingInfoText'>
            {listing.bathrooms>1? `${listing.bathrooms} bathrooms` : "1 bathroom"}
            </p>
        </div>
    </div>
    </Link>
    {onDelete && (
        <DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={()=>onDelete(listing.id,listing.name)}/>
    )}
   </li>
  )
}

export default ListingItem
