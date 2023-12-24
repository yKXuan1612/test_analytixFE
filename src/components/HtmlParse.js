import parse from "html-react-parser";
import './ckeditorcss.css'
function HtmlParse({html}){
    return (
        <>
            {
                html && parse(html)
            }
        </>
    )
}

export default HtmlParse;