import React,{ forwardRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html} from '@codemirror/lang-html'
import { BasicSetupOptions } from '@uiw/react-codemirror';
import {css} from '@codemirror/lang-css'
import CodeMirror from '@uiw/react-codemirror';

import { fetchUsers, increment } from "../slices/userSlice";
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux';


//const code = "console.log('hello world!');\n\n\n";
// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
//const extensions = [javascript()];



//react resize dectector with react draggable to create resizable iframe for webpage display
const HTMLextensions = [html()]
const CSSextensions = [css()]
const JSextensions = [javascript()]


const setup: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
}




export default function Editor(){
  const HtmlEditor = useRef();
  const [html, setHtml] = useState<string>('<h1> hello world </h1>')
  const [style, setStyle] = useState<string>('.body { background-color: red}')
  const [javascript, setJavascript] = useState("console.log('hello wrold')")
  const srcdoclayout = `
<!DOCTYPE html>
<html lang="en">
<head><link rel="stylesheet" href="${style}"></head>
  <body>
  ${html}
  </body>
</html>
`
const editors = [
  {
    name: 'html', 
    value: html,
    extensions: HTMLextensions,
    onChange: (e:any) => setHtml(e), 
  },
 {
    name: 'javascript', 
    value: javascript,
    extensions: JSextensions,
    onChange: (e: any ) => setJavascript(e), 
  },
  {
    name: 'css', 
    value: style, 
    extensions: CSSextensions,
    onChange: (e:any) => setStyle(e), 
  },
]

  const [currentTab, SetCurrentTab] = useState(0)
  const [layout, ChangeLayout] = useState(true)

  const editortabs = <div className='flex w-full justify-between'>{editors.map(editor => {return (
   <div className='p-6 border-b-blue-400 cursor-pointer border-2 text-blue text-2xl' onClick={() => editor.name == 'javascript' ? SetCurrentTab(1) : editor.name == 'css' ? SetCurrentTab(2) : SetCurrentTab(0)}>{editor.name}</div>
   )})}</div> 
  const indexing = layout ? editors.filter(tab => currentTab == editors.indexOf(tab) ) : editors

  const {entities, loading, value } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current == false) {
      dispatch(fetchUsers())
    }
    return () => {
      ref.current = true
    }
  }, [])
  return (
    <div className="w-screen h-full flex">
    <div className='w-1/2 border h-full flex flex-col'>
      
      {layout ? editortabs : '' }
      <button onClick={() => ChangeLayout(!layout)}>change layout</button>
      <div>    {loading ? (
        <h1>Loading...</h1>
      ) : (
        entities?.map((user: any) => <h3 key={user.id}>{user.name}</h3>)
      )}</div>
      
    {indexing.map((editor, index) => {
      return (
        <div className={`border-black border ${layout ? 'h-full' : 'h-1/3'} p-4 bg-white`} key={index}>
          <div>{editor.name}</div>
          <CodeMirror
          value={editor.value}
          extensions={editor.extensions}
          onChange={(e) => setHtml(e)}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
          style={{border: 'none'}}
          />
        </div>
      )
    })}


  </div>

    <div className="w-1/2 h-full border">
      <iframe title="iframe" srcDoc={srcdoclayout} />
    </div>

  </div>
  );
}



const saveme = `{editors.map((editor, index) => {
  return (
    <div className="border-black border h-1/3 bg-white" key={index}>
      <div>{editor.name}</div>
      <CodeMirror
      value={editor.value}
      extensions={editor.extensions}
      onChange={(e) => setHtml(e)}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
      style={{border: 'none'}}
      />
    </div>
  )
})}</>`