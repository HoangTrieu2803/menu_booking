import React, { ReactElement,useState } from 'react'
import { Member } from './type'
import './style.scss'
import {Facebook, Instagram, LinkedIn, Google } from '@mui/icons-material'

const member = [{img:'team1.jpg' , name: 'MARC COPPOLO' , position : 'Executive Chef'},
{img:'team2.jpg' , name: 'MARY SANDRA' , position : 'Head Of Chef'},
{img:'team3.jpg' , name: 'LOHAN CRAIG' , position : 'Decoration Chef'}]

const renderTeamMember = () =>{
    return member.map((item : Member) =>{
        return(
            <div className='team-content-member-contain-item' style={{backgroundImage:`url(./img/${item.img})`}}>
                <img src={`./img/${item.img}`} alt="" />
                <div className="team-content-member-contain-item-detail">
                <h5>{item.name}</h5>
                <p>{item.position}</p>
                <p className='team-content-member-contain-item-detail__icon'>
                    <Facebook/>
                    <Instagram/>
                    <LinkedIn/>
                    <Google/>
                </p>
                </div>
            </div>
        )
    })
}

export default function Team(): ReactElement {
  return (
    <div className='team'>
        <div className='team-content'>
            <div className="team-content-banner">
                <div className="team-content-banner-title">
                    <h1>Need a Quality & Taste Improve?</h1>
                    <h3>Meet our Team Chef</h3>
                </div>
            </div>
            <div className="team-content-member">
                <div className="team-content-member-title">
                    <h3>Talent and Experience</h3>
                    <h1>Team Members</h1>
                    <span><img src="./img/flower-decor.png" alt="" /></span>
                </div>
                <div className='team-content-member-contain'>
                {renderTeamMember()}
                </div>
            </div>
        </div>
    </div>
  )
}
