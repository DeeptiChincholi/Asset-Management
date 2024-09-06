import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { useState ,useEffect } from 'react';
import Menubar from '../Dashboard/Menubar';
import Header from '../Dashboard/Header';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Check from './Check';
import Swal from 'sweetalert2';
import axios from 'axios'



export default function Assets() {


  const[errorhide,setErrorHide] = useState(false);
  const [preview,setPreview] = useState(false);
  const [formError,setFormError] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const [Count,setCount] = useState(()=>{
    const savedCount = localStorage.getItem('count');
    return savedCount!== null?JSON.parse(savedCount):0;
  });
  const [records, setRecords] = useState([]);
  const [formData , setFormData] = useState({
    assetName: '',
    site: '',
    assetId: '',
    serialNumber: '',
    modal: '',
    tagNumber: '',
    date: null,
    rfid: '',
    purchasePrice: '',
    purchaseDate: null,
    purchaseInvoice: '',
    expectedLife: '',
    supplier: '',
    manufacturer: '',
    assetStatus: '',
    costCenter: '',
    parentAsset: '',
    dateRemoved: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
   
  useEffect(() => {
    try {
      const storedAssets = JSON.parse(localStorage.getItem('record')) || [];
      setRecords(storedAssets);
      setCount(storedAssets.length);
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      // Handle error or set default values
    }
  }, []);
  
  

    useEffect(()=>{
      localStorage.setItem('count',JSON.stringify(Count));
    },[Count]);


    const validate=(value)=>{

      let error = {}
      const assetNameRegex = /^[a-zA-Z\s]{1,20}$/i;
      const serialNumberRegex = /^\d{10}$/; // Regex to check exactly 10 digits

      if(!value.assetName){
        error.assetName = "Asset Name can't be empty";
      } else if(!assetNameRegex .test(value.assetName)){
        error.assetName="Asset Name can't have number";
      }

      if (!value.serialNumber) {
        error.serialNumber = "Serial Number can't be empty";
      } else if (!serialNumberRegex.test(value.serialNumber)) {
        error.serialNumber = "10 numeric digits required";
      }

    
      if(!value.modal)
        error.modal = "Modal name can't be empty";
      if(!value.tagNumber)
        error.tagNumber = "Tag Number can't be empty";
      if(!value.parentAsset)
        error.parentAsset = "Parent Asset can't be empty";
      if(!value.purchaseInvoice)
        error.purchaseInvoice = "Purchase invoice can't be empty";
      if(!value.rfid)
        error.rfid = "Rfid can't be empty";
      
      if(Object.keys(error).length===0)
      {
        // setPreview(true);
        setErrorHide(false);
      }else{
        setErrorHide(true);
      }
      return error;

    }
    useEffect(()=>{
      if(Object.keys(formError).length===0 && isSubmit)
      {
        console.log(records);
           // Reset form fields
  
      }
    },[formError])
  
    const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    const errors = validate(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit this form?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with form submission
          const newRecord = { ...formData, id: new Date().getTime().toString() };
          const updatedRecords = [...records, newRecord];
          localStorage.setItem('record', JSON.stringify(updatedRecords));
          localStorage.setItem('currentData',JSON.stringify(newRecord));
          setRecords(updatedRecords);
          setCount(updatedRecords.length);
          setIsSubmit(true);
          axios.post('http://localhost:5000/assets',formData).then(result=>console.log(result)).catch(err=>console.log(err))

          // Show success message after submission
          Swal.fire('Submitted!', 'Your form has been submitted successfully.', 'success');
          setFormData({
            assetName: '',
            site: '',
            assetId: '',
            serialNumber: '',
            modal: '',
            tagNumber: '',
            date: null,
            rfid: '',
            purchasePrice: '',
            purchaseDate: null,
            purchaseInvoice: '',
            expectedLife: '',
            supplier: '',
            manufacturer: '',
            assetStatus: '',
            costCenter: '',
            parentAsset: '',
            dateRemoved: null,
          });
          setPreview(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle cancel action if needed
          Swal.fire('Cancelled', 'Your form submission was cancelled.', 'error');
        }
      });
    }
  };

  const handleDateChange=(name,date)=>{
    setFormData({
      ...formData,
      [name] : date
    });
  };
  const maxDate = dayjs();
  return (
    <>
    <div style={{position:'fixed', zIndex:'10'}}><Menubar/></div>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <div style={{display:'flex', marginLeft:'50px', flexDirection:'column', backgroundColor:'aliceblue'}}>
      <Header/>
      <div style={{display:'flex' , flexDirection:'row'}}>
      <div style={{backgroundColor:'aliceblue', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height: errorhide?'100vh':'89vh'}}>
        
      { preview ? <Check/> :
      <div  style={{backgroundColor:'aliceblue', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',height: errorhide?'100vh':'89vh'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%', paddingTop:'10px'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            
            <p>Asset Name</p>
            <div>
            <TextField
              fullWidth
              size='small'
              // required
              id="outlined"
              label="Required"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
            />
           
            <p style={{color:'red',marginLeft:'12px'}}>{formError.assetName}</p>
             </div>
            </div>
            
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
              <p>Site</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                name="site"
                value={formData.site}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Noida'}>Noida</MenuItem>
                <MenuItem value={'Gurgaon'}>Gurgaon</MenuItem>
                <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Asset id # </p>
            <TextField
              fullWidth
              size='small'
              id="outlined"
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Serial #</p>
            <div>
            <TextField
              fullWidth
              size='small'
             
              id="outlined"
              label="Required"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
            />

               <p style={{color:'red',marginLeft:'12px'}}>{formError.serialNumber}</p>
               </div>
            </div>
          </div>
       
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Modal</p>
            <div>
            <TextField
              fullWidth
              size='small'
              // required
              id="outlined"
              label="Required"
              name="modal"
              value={formData.modal}
              onChange={handleChange}
            />
            <p style={{color:'red',marginLeft:'12px'}}>{formError.modal}</p>
            </div>
            </div>
            
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Tag Number</p>
            <div>
            <TextField
              fullWidth
              size='small'
              // required
              id="outlined"
              label="Required"
              name="tagNumber"
              value={formData.tagNumber}
              onChange={handleChange}
            />
             <p style={{color:'red',marginLeft:'12px'}}>{formError.tagNumber}</p>
             </div>
            </div>
          </div>
 
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p style={{fontSize:'15px'}}>Date</p>
            <DatePicker
              value = {formData.date}
              onChange={(date)=>handleDateChange('date',date)}
              maxDate={maxDate}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>RFID</p>
            <div>
            <TextField
              fullWidth
              size='small'
              // required
              id="outlined"
              label="Required"
              name="rfid"
                      value={formData.rfid}
                      onChange={handleChange}
            />
              <p style={{color:'red',marginLeft:'12px'}}>{formError.rfid}</p>
            </div>
            </div>
          </div>          
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Purchase Price</p>
            <TextField
              type="number"
              size='small'
              min={0}
              name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleChange}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Purchase Date</p>
            <DatePicker
              value={formData.purchaseDate}
              onChange={(date)=>handleDateChange('purchaseDate',date)}
              maxDate={maxDate}
            />
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Purchase Invoice #</p>
            <div>
            <TextField
              fullWidth
              size='small'
              // required
              id="outlined"
              label="Required"
              name="purchaseInvoice"
                      value={formData.purchaseInvoice}
                      onChange={handleChange}
            />
              <p style={{color:'red',marginLeft:'12px'}}>{formError.purchaseInvoice}</p>
            </div>
            </div>
          
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Expected Life</p>
            <TextField
              type="number"
              size='small'
              min={0}
              name="expectedLife"
                      value={formData.expectedLife}
                      onChange={handleChange}
            />
            </div>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Supplier</p>
            <TextField
              fullWidth
              size='small'
              id="outlined-required"
              name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Manufacturer</p>
            <TextField
              fullWidth
              size='small'
              id="outlined-required"
              name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
            />
            </div>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Asset Status</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                name="assetStatus"
                        value={formData.assetStatus}
                        onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Paused'}>Paused</MenuItem>
                <MenuItem value={'Terminated'}>Terminated</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Cost Center</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                name="costCenter"
                        value={formData.costCenter}
                        onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Noida'}>Delhi</MenuItem>
                <MenuItem value={'Gurgaon'}>Chennai</MenuItem>
                <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Parent Asset</p>
            <div>
            <TextField
              fullWidth
              size='small'
       
              id="outlined"
              label="Required"
              name="parentAsset"
                      value={formData.parentAsset}
                      onChange={handleChange}
            />
            <p style={{color:'red',marginLeft:'12px'}}>{formError.parentAsset}</p>
            </div>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Date Removed</p>
            <DatePicker
              value={formData.dateRemoved}
              onChange={(date)=>handleDateChange('dateRemoved',date)}
              maxDate={maxDate}
              minDate={formData.purchaseDate||null}
            />
            </div>
          </div>
        </div> 
        </div>
        }
        {
          preview? <></>:
        <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', height:'100%', paddingBottom:'20px',marginTop:'-25px'}}>
        <Button variant="outlined" size="medium" type="submit">
          Submit
        </Button>
    </div>
        }
      </div>
      
     
      {/* <div style={{width:'40%', height:'80vh', backgroundColor:'aliceblue', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div style={{fontWeight:'800', fontSize:'48px', paddingBottom:'10px', marginTop:'10px', alignItems:'center'}}>Asset Details</div>
        <img src={abc} alt="" style={{width:'200%'}}/>
        </div> */}
      </div>
      </div>

    </Box>
    </>
  );
}