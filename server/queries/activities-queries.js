
const CREATE_ACTIVITY = `
    mutation createActivity(
            $id: ID!,
            $title: String!
        ){
        createActivity(
            stageId: $id,
            title: $title
        ){
            id,
            title
        }
    }
`;

const ACTIVITIES_BY_STAGE = `
    query activitiesByStages($id: ID!){
        allActivities(
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

const DELETE_ACTIVITY = `
    mutation deleteActivity($id: ID!){
      deleteActivity(id: $id){
        id
      }
  
    }
`;


const UPDATE_ACTIVITY = `
    mutation updateActivity(
            $id: ID!,
            $title: String!,
            $link: String,
            $imageUrl: String!
            $price: String
        ){
        updateActivity(
            id: $id,
            title: $title,
            link: $link,
            imageUrl: $imageUrl,
            price: $price
        ){
            id,
            title,
            link,
            imageUrl,
            price
        }
    }
`;


export { CREATE_ACTIVITY, ACTIVITIES_BY_STAGE, DELETE_ACTIVITY, UPDATE_ACTIVITY };
