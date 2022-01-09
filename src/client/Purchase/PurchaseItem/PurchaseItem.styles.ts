import styled from 'styled-components';

 export const Wrapper = styled.div`
   justify-content: space-between;
   font-family: Arial, Helvetica, sans-serif;
   border-bottom: 1px solid lightblue;
   padding-bottom: 20px;

   div {
     flex: 1;
   }

   .item {
     display: flex;
     justify-content: space-between;
     padding-bottom: 20px;
   }

   img {
     max-width: 200px;
     object-fit: cover;
     margin-left: 40px;
     padding: 20px;
   }
 `;