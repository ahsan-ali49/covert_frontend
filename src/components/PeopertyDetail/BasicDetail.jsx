import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../util/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BasicDetail = ({ property }) => {

  const [info, setInfo] = useState('')
  const [city, setCity] = useState('')

  const searchCityInfo = () => {
    api.get(`/properties/wikipedia?query=${property.zipcode}`)
      .then((response) => {
        let { data, city } = response.data;
        const pageId = Object.keys(data.query.pages)[0];
        const content = data.query.pages[pageId].extract;
        setInfo(content);
        setCity(city);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    searchCityInfo();
  }, [])


  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center w-full overflow-hidden'>

        <h2 className='text-[35px] font-semibold flex-1'>
          {property.address}
        </h2>

        <div className=' flex flex-col md:flex-row md:items-center gap-6'>
          <h3 className=' text-blue-500 font-semibold text-[44px]'>
            ${property.price}
          </h3>

          <Link to='/schedual/meeting' rel="noreferrer" target={'_blank'}>
            <Button
              // className='rounded-lg bg-primary text-white font-semibold text-[21px]'
              variant='contained'
              size='large'
            >
              Schedual Meeting
            </Button>
          </Link>
        </div>
      </div>

      <div className='flex gap-4 my-3'>
        {/* <div className='flex items-center gap-1 bg-yellow-50 rounded-xl px-2'>
          <StarIcon style={{
            color: '#FFD700'
          }} />
          {property.rating}
        </div> */}
        <p className=' text-[21px]'>{property.units} units</p>
      </div>


      <div className='flex text-[21px] flex-wrap flex-col md:flex-row gap-1 md:gap-8 my-4'>
        {
          [
            {
              text: 'Actuals CAP:',
              value: `${property.actualCAP}%`
            },
            {
              text: 'Pro Forma CAP:',
              value: `${property.proFormaCAP}%`
            },
            {
              text: 'Occupancy:',
              value: `${property.occupancy}%`
            },
            {
              text: 'Year Built:',
              value: property.builtYear
            },
            {
              text: 'Property Type',
              value: property.propertyType
            }
          ].map((el, i) => (
            <>
              {
                (i === 0) ? (
                  <p className="font-['Poppins'] mb-1">
                    <span className=" font-semibold mr-2">{el.text}</span> {el.value}
                  </p>
                ) : (
                  <>
                    <span className='hidden md:inline'>|</span>
                    <p className="font-['Poppins'] mb-1">
                      <span className=" font-semibold mr-2">{el.text}</span> {el.value}
                    </p>
                  </>
                )
              }
            </>
          ))
        }
      </div>


      {/* <div className='my-8'>
        <Box>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}>
            Top Features
          </Typography>
          <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>


      <div className='flex items-center justify-between flex-wrap my-5'>
        {
          property?.features?.map((feature, index) => (
            <div className='flex items-center gap-2' key={index}>
              <CheckCircleOutlineOutlinedIcon sx={{ color: 'blue' }} />
              <span>{feature}</span>
            </div>
          ))
        }
      </div> */}


      <div className='mt-12 mb-5'>
        <Box>
          <h3 className=' text-2xl font-bold tracking-[2px]'>
            Description
          </h3>
          <Divider sx={{ width: '4%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>
      {
        property?.description || 'If you are admin, add description'
      }

      <div className='mt-12 mb-5'>
        <Box>
          <h3 className=' text-2xl font-bold tracking-[2px]'>
            Details
          </h3>
          <Divider sx={{ width: '4%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>


      <div className=' mb-5'>
        <p className=' text-justify text-[21px]'>
          {
            (info?.length > 1000) ? (
              <>
                {info.slice(0, 1000) + '...'}
                <a
                  href={`https://en.wikipedia.org/wiki/Special:Search?search=${city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=' text-blue-500'
                >
                  See More
                </a>
              </>
            ) : (
              <>
                {
                  info
                }
              </>
            )
          }
        </p>
      </div>
    </>
  )
}

export default BasicDetail