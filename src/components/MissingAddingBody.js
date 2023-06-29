import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    MDBContainer,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
  import { Button } from 'react-bootstrap';

export default function WantedAddingBody() {

    let base64 = ''
    const UplaodImage = async(e) => {
        const file = e.target.files[0]
        base64 = await convertBase64(file)
        console.log(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve,reject) => {
            const filereader = new FileReader();
            filereader.readAsDataURL(file);

            filereader.onload = () => {
                resolve(filereader.result)
            };

            filereader.onerror((error) => {
                reject(error)
            })
        })
    }

  const effectRan = useRef(false)
    
    const userOrOfficer = localStorage.getItem("usertype");
    const navigate = useNavigate()
    const callComplaintPage = async() => {
        try {
            console.log("Going to fetch from complaintauth");
            const response = await fetch(`http://localhost:5000/complaintauth?authToken=${localStorage.getItem("authToken")}` , 
            {
                method:"GET",
                headers:{
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });
            const data = await response.json();
            console.log(data);
            console.log("Returned from fetching comlpaintauth");

            if(!data.success || userOrOfficer === 'user'){
                navigate("/")
              }

        } catch (error) {
            console.log("There was an error in authenticating user");
            navigate("/login");
        }
    }
    
    if(userOrOfficer === 'user'){
        navigate("/")
    }

    useEffect(() => {
        if(effectRan.current === false){
            callComplaintPage()
            effectRan.current = true
        }
    }, [])

    const initialcreds = {fname: "",lname: "",age: "",gender: "",height: "",weight: "",location: "",date: "",contactno: ""}
    const [credentials, setcredentials] = useState(initialcreds)
    
    const createMissing = async(image64) =>{
        try{
            const MissingResponse = await fetch("http://localhost:5000/addmissing",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname: credentials.fname,lname: credentials.lname,age: credentials.age,img: image64,gender: credentials.gender,height: credentials.height,weight: credentials.weight,location: credentials.location,date: credentials.date,contactno: credentials.contactno})
            })

            const jsonMissing = await MissingResponse.json()
            console.log(jsonMissing);

            if(!jsonMissing.success){
                alert("There was an error in accepting you data. Please try again.")
            }
            if(jsonMissing.success){
                console.log("Created Missing succesfully");
                navigate("/missingtable")
            }
        }
        catch(err){
            console.error(err);
        }
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(userOrOfficer === 'officer'){
            console.log("Since officer, going to createmissing");
            createMissing(base64)
        }
    }

    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name] : event.target.value})
    }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <h2 className='head'>Add a Missing Person</h2>
       <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        
      <label for="imageUpload" class="form-label">Upload Image</label>
      <input class="form-control form-control-sm" id="imageUpload" type="file" accept="image/*" />

  <MDBInput wrapperClass='mb-4' label='First name' name='fname' type='text' value = {credentials.fname} onChange={onChange} required />
      <MDBInput wrapperClass='mb-4' label='Last name' name='lname' type='text' value = {credentials.lname} onChange={onChange} required />
      <div className="d-flex justify-content-between">
        <MDBInput wrapperClass='mb-4' label='Age' name='age' type='number' value = {credentials.age} onChange={onChange} required />
        <MDBInput wrapperClass='mb-4' label='Gender' name='gender' type='text' value = {credentials.gender} onChange={onChange} required />
        <MDBInput wrapperClass='mb-4' label='Contact no' name='contactno' type='number' value = {credentials.contactno} onChange={onChange} required />
      </div>

      <div className="d-flex justify-content-between">
      <MDBInput wrapperClass='mb-4' label='Height' name='height' type='number' value = {credentials.height} onChange={onChange} required />
      <MDBInput wrapperClass='mb-4' label='Weight' name='weight' type='number' value = {credentials.weight} onChange={onChange} required />
      </div>
      <div className="d-flex justify-content-between">
      <MDBInput wrapperClass='mb-4' label='Location' name='location' type='text' value = {credentials.location} onChange={onChange} required />
      <MDBInput wrapperClass='mb-4' label='Date' name='time' type='date' value = {credentials.time} onChange={onChange} required />
      </div>

  <Button className="mb-4 w-100" type='submit'>Submit</Button>

       </MDBContainer>
    </form>


    </>
    )
  }