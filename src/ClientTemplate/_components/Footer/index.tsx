import React, { ReactElement } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import './style.scss'

export default function Footer():ReactElement {
  return (
      <div className='footer'>
        <div className='footer-content'>
            <div className='footer-content-top'>
                <div className='footer-content-top-left'>
                  <p className='footer-content-top-left__icon'><FacebookIcon /> <InstagramIcon /> <TwitterIcon /></p>
                </div>
                <div className='footer-content-top-center'>
                  HAPPY MEAL
                </div>
                <div className='footer-content-top-right'>
                    <input className='footer-content-top-right__input' type="text" placeholder='Send your email here' />
                    <SendIcon className='footer-content-top-right__icon'/>
                </div>
            </div>
            <hr />
            <div className='footer-content-bottom'>
                <div className='footer-content-bottom-left'>
                  <h3>Address</h3>
                  <h5>Eight Avenue 385,</h5>
                  <h5>Newyork</h5>
                </div>
                <div className='footer-content-bottom-center'>
                  <h3>Open Timing</h3>
                  <h5>Monday - Thursday</h5>
                  <h5>7am - 10pm</h5>
                </div>
                <div className='footer-content-bottom-right'>
                  <h3>Contact Us</h3>
                  <h5>example@example.com</h5>
                  <h5>+7(111)8765432</h5>
                </div>
            </div>
        </div>
      </div>
  )
}