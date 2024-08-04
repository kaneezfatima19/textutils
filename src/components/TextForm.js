import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick=()=>{
        let newText=text.toUpperCase();
        setText(newText)
    }
    const handleLowCick=()=>{
        let newText=text.toLowerCase();
        setText(newText);
    }
    const handleClearCick=()=>{
        let newText="";
        setText(newText);
    }
    const handleRevCick=()=>{
        let newText=text.split("").reverse().join('');
        setText(newText);
    }
    const handleSenClick = () => { 
        let sentences = text.split('. ');
        for (let i = 0; i < sentences.length; i++) {
            sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].substring(1).toLowerCase();
        }
        let newText = sentences.join('. ');
        setText(newText);
    }

    const handleSpeak=()=> { 
        let newText=new SpeechSynthesisUtterance();
        newText.text=text;
        window.speechSynthesis.speak(newText);
        props.handleAlert("Speak mode on","success")
    }
    const downloadText = (text, filename) => {
        const element = document.createElement('a');
        const file = new Blob([text], {type: 'text/plain'});
        
        element.href = URL.createObjectURL(file);
        element.download = filename;
        
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        
        document.body.removeChild(element);
    }
    
    //on change even is used to type something in the text box
    const handleOnChange=(event)=>{
        setText(event.target.value)
    }

    const [text, setText] = useState("");
    const[myStyle,setMyStyle]=useState({
        color:'black',
        backgroundColor:'white'
    })
  return (
    <>
    <div className="container" style={{ 
    color: props.prettyMode === 'pretty' ? 'black' : (props.mode === 'dark' ? 'white' : 'black') 
    }}>
      <h1 style={{color: props.mode==='dark'?'white':'black'}}>{props.heading}</h1>
      <div className='mb-3'>
      <textarea className="form-control" placeholder="Enter your text here" value={text} onChange={handleOnChange} style={{
      backgroundColor: props.prettyMode === 'pretty' ? '#baa0c1' : (props.mode === 'dark' ? 'black' : 'white'),
      color: props.prettyMode === 'pretty' ? '#491357' : (props.mode === 'dark' ? 'white' : 'black')
      }} id="myBox" rows="8"></textarea>
      </div>

    <button className="btn btn-dark dropdown-toggle" style={{backgroundColor:props.prettyMode==='pretty'?'#8e539d':'black',color: props.prettyMode==='pretty'?'black':'white'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Case</button>
    <ul className="dropdown-menu">
    <li><button className="btn btn-dark dropdown-item" onClick={handleUpClick} >UpperCase</button></li>
    <li><button className="btn btn-dark dropdown-item " onClick={handleLowCick}>LowerCase</button></li>
    <li><button className="btn btn-dark dropdown-item" onClick={handleSenClick}>SentenceCase</button></li>
    </ul>
    <button type="submit" className="btn btn-dark mx-2" style={{backgroundColor:props.prettyMode==='pretty'?'#8e539d':'black',color: props.prettyMode==='pretty'?'black':'white'}} onClick={handleSpeak}>Speak</button>
    <button className="btn btn-dark mx-2" style={{backgroundColor:props.prettyMode==='pretty'?'#8e539d':'black',color: props.prettyMode==='pretty'?'black':'white'}} onClick={handleRevCick}>Reverse</button>
    <button className="btn btn-dark mx-2" style={{backgroundColor:props.prettyMode==='pretty'?'#8e539d':'black',color: props.prettyMode==='pretty'?'black':'white'}} onClick={downloadText}>Download</button>
    <button className="btn btn-dark mx-2" style={{backgroundColor:props.prettyMode==='pretty'?'#8e539d':'black',color: props.prettyMode==='pretty'?'black':'white'}} onClick={handleClearCick}>Clear</button>

    <div className="container my-4" style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((word) => word.length > 0).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((word) => word.length > 0).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter your text in the above text box to preview it here"}</p>
    </div>
    </div>
    </>
  )
}
