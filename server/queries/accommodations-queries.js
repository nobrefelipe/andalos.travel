
const CREATE_ACCOMMODATION = `
    mutation createAccommodation(
            $id: ID!,
            $title: String!
        ){
        createAccommodation(
            stageId: $id,
            title: $title
        ){
            id,
            title
        }
    }
`;

const ACCOMMODATIONS_BY_STAGE = `
    query accommodationsByStages($id: ID!){
        allAccommodations(
            filter:{
              stage:{
                id: $id
              }
            }
          ){
            id,
            title,
            link,
            imageUrl
          }
    }
`;

const DELETE_ACCOMMODATION = `
    mutation deleteAccommodation($id: ID!){
      deleteAccommodation(id: $id){
        id
      }
  
    }
`;


const UPDATE_ACCOMMODATION = `
    mutation updateAccommodation(
            $id: ID!,
            $title: String!,
            $imageUrl: String,
            $link: String,
            $price: String
        ){
        updateAccommodation(
            id: $id,
            title: $title,
            imageUrl: $imageUrl,
            link: $link,
            price: $price
        ){
            id,
            title,
            imageUrl,
            link,
            price
        }
    }
`;


export { CREATE_ACCOMMODATION, ACCOMMODATIONS_BY_STAGE, DELETE_ACCOMMODATION, UPDATE_ACCOMMODATION };
