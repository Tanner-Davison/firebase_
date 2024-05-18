import React, {useEffect} from 'react'
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';

const MouseFollower = () => {

    const handleMouseMove=()=>{
        const dot = document.createElement('span');
        
    }

    useEffect(()=>{
        window.addEventListener('mousemove',handleMouseMove)
    })
  return (
    <Wrapper>
      
    </Wrapper>
  )
}

export default MouseFollower

const Wrapper = styled.div`
position: relative;
width: 100%;
height: 100%;
`