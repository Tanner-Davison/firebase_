import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';

const TruncatedText = ({ text, maxLength }) => {
	const [trunkedText, setTrunkedText] = useState(text);

	useEffect(() => {
        console.log(text)
        
		if (text.length > maxLength) {
			setTrunkedText(text.slice(0, maxLength) ); // truncate text if it exceeds maxLength
		} else {
			setTrunkedText(text);
		}
	}, [text, maxLength]);

	return <>{trunkedText} {text.length > maxLength && <Button> [continue...] </Button>} </>;
};

export default TruncatedText;

const Button = styled.div`
display: inline;
${text.bodyMBold}
cursor:pointer;
color:black;
&:hover{
    color:darkblue;
}
`