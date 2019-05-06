const stagesByIntinerary = `
    query stagesByIntinerary($itineraryID: ID!){
        allStages(
            filter:{
              itinerary:{
                id: $itineraryID
              }
            }
          ){
            id,
            title
          }
    }
`;


const Stage = `
    query Stage($id: ID!){
        Stage(id:$id){
            id,
            title,
            description,
            days,
            activities{
              id,
              title
            }
          }
    }
`;

const CREATE_STAGE = `
    mutation createStage(
            $id: ID!,
            $title: String!
        ){
        createStage(
            itineraryId: $id,
            title: $title
        ){
            id,
            title
        }
    }
`;

const UPDATE_STAGE = `
    mutation updateStage(
            $id: ID!,
            $title: String!,
            $days: String
            $description: String!
        ){
        updateStage(
            id: $id,
            days: $days,
            title: $title,
            description: $description
        ){
            id,
            title,
            description,
            days
        }
    }
`;

const DELETE_STAGE = `
    mutation deleteStage($id: ID!){
      deleteStage(id: $id){
        id
      }
  
    }
`;



export { stagesByIntinerary, Stage, CREATE_STAGE, UPDATE_STAGE, DELETE_STAGE };
