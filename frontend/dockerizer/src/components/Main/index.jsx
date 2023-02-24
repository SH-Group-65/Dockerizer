import React from 'react'
import './index.css'

const defaultOptions = {
    sourceCodeType: "",
    zipFile: null,
    gitRepoLink: "",
    dockerfilePresent: "",
    rootFolder: ""
}

function Main() {
    const [options, setOptions] = React.useState(defaultOptions);
    const [sourceCodeInput, setSourceCodeInput] = React.useState("");

    const handleChange = (e) => {
        if (e.target.name == "sourceCodeType")
            showCorrectInput(e.target.value);
        setOptions(prevOpt => ({ ...prevOpt, [e.target.name]: e.target.value.trim() }));
        console.log(options);
    }
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setOptions(prevOpt=>({... prevOpt, [e.target.name]: e.target.files[0]}))
    }

    const showCorrectInput = (inputType) => {
        setSourceCodeInput(inputType);
        setOptions(prevOpt => ({ ...prevOpt, zipFile: null, gitRepoLink: "" }));
    }
    
    const handleSubmit = async (e) => {
        console.log(options);
        if (options.sourceCodeType === "zip" && options.zipFile === null)
        {
            alert('Error: No zip file selected')
            return;
            
            }
        else if (options.sourceCodeType === "repo" && options.gitRepoLink === "")
        {
            alert('Error: No repo link added')
            return;
            }
        else if (options.sourceCodeType === "")
        {
            alert("Choose a zip file or put a repo link of the source code to dockerize")
            return;
        }
        if (options.dockerfilePresent === "") 
        {
            alert("Confirm if you have a dockerfile present in your source code folder!");
            return;
        }
            
        const data = new FormData();
        for (let optionKey in options) {
            data.append(optionKey, options[optionKey])
        }
        console.log(data);
        // 192.168.0.106
        const response = await fetch('http://172.20.10.5:8000', {
            method: "POST",
            body: data,
        })
        const result = await response.json()
        .catch(err=> console.log(err))
        console.log(result);

    }


  return (
    <main>
          <div className='contents'>
              <fieldset className='source-code-type'>
                  <legend>
                      Source code? 
                  </legend>
             
                  <input type="radio" id="link" name="sourceCodeType" value="repo" onChange={handleChange} />
                  <label htmlFor="link">GitHub Repo</label>
                  <input type="radio" id="file" name="sourceCodeType" value="zip" onChange={handleChange} />
                  <label htmlFor="file">Zip File</label>
                  <div className='code-info'>
                      
                
                  {
                      sourceCodeInput && (
                          sourceCodeInput == "zip" ? (
    
                                  <input type="file" name="zipFile" accept=".zip,.gz" onChange={handleFileChange} />
                              
                            ) : (
                                <input type="text" className='repo_text' name="gitRepoLink" onChange={handleChange}/>
                            )
                      )
                      }
                      </div>
              </fieldset>
              <fieldset className='application-info'>
                  <legend>
                      Application Configuration
                  </legend>
                  <section className='dockerfile-present'>
                      <h4>Do you have a dockerfile present in the source code provided?</h4>
                      <input type="radio" name="dockerfilePresent" id='dockerfile-yes' value='yes' onChange={handleChange} /> <label htmlFor='dockerfile-yes'>Yes</label> 
                      <input type="radio" name="dockerfilePresent" id='dockerfile-no' value='no' onChange={handleChange}/> <label htmlFor="dockerfile-no"> No </label>
                  </section>
                  <section className='root-folder'>
                      <label htmlFor='rootfolder-text'>What is the root folder of your application</label>
                      <input type="text" name="rootFolder" id="rootfolder-text" onChange={handleChange} /><br/>
                      <small style={{ color: "gray", marginLeft: "0.25rem"}}>You can just type in "." or leave empty if the root folder is the present application folder.</small>
                  </section>
              </fieldset>

              <button style={{fontWeight: "bold"}} onClick={handleSubmit}>Dockerize</button>
      </div>
    </main>
  )
}

export default Main
