import styled from '@emotion/styled'
import { useDropzone } from 'react-dropzone'
import Image from '../../../assets/images/ImagePicker.png'

export const ImagePicker = ({ onDrop, file }) => {
   const { getRootProps, getInputProps } = useDropzone({ onDrop })
   return (
      <ImgPickerCont {...getRootProps()}>
         <div>
            <ImgCont>
               <input {...getInputProps()} type="file" accept="image/*" />
               <img src={file || Image} alt="Your selected file" />
            </ImgCont>
         </div>
         <Description>
            Нажмите на иконку чтобы <br /> загрузить или перетащите фото
         </Description>
      </ImgPickerCont>
   )
}

const ImgPickerCont = styled.div`
   display: flex;
   width: 249px;
   height: 187px;
   flex-direction: column;
`
const ImgCont = styled.div`
   width: 173px;
   height: 145px;
   border-radius: 10px;
   margin: 0 auto;
   cursor: pointer;
   & > img {
      width: 173px;
      height: 145px;
      border-radius: 10px;
   }
`
const Description = styled.div`
   width: 100%;
   height: 36px;
   display: flex;
   margin-top: 10px;
   font-family: 'Nunito', sans-serif;
   font-style: normal;
   letter-spacing: 0.5px;
   font-weight: 400;
   font-size: 14px;
   line-height: 130%;
   color: #8d949e;
   text-align: center;
   justify-content: center;
`
