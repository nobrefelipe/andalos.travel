const ALL_ITINERARIES = `
    query allItineraries{
        allItineraries{
            id,
            title,
            description,
            coverImageId,
            coverImageSecret,
            budget,
            style,
            dificultyLevel,
            startDate,
            endDate,
            location,
            published,
            slug,
            designer{
              id
              name
            }
        }
    }
`;


const ALL_ITINERARIES_HOME = `
    query allItineraries{
        allItineraries(
            filter:{
                    published: true
                }
            ){
                title,
                coverImageSecret,
                budget,
                style,
                dificultyLevel,
                slug,
                designer{
                  name
                }
           
            }
    }
`;

const GET_ITINERARY_BY_ID = `
    query Itinerary($id: ID!){
        Itinerary(id: $id){
            id,
            title,
            description,
            coverImageId,
            coverImageSecret,
            budget,
            style,
            dificultyLevel,
            startDate,
            endDate,
            location,
            published,
            slug
            designer{
                id
            }
        }
    }
`;


const GET_ITINERARY_BY_SLUG = `
    query Itinerary($slug: String!){
        Itinerary(slug: $slug){
            id,
            title,
            description,
            coverImageId,
            coverImageSecret,
            budget,
            style,
            dificultyLevel,
            startDate,
            endDate,
            published,
            slug,
            location,
            designer{
                id
                name
            },
            stages{
                id,
                title,
                description,
                days,
                activities{
                    id,
                    title, 
                    description,
                    link,
                    price,
                    imageUrl
                },
                accomodations{
                    id,
                    title,
                    description,
                    imageUrl,
                    price,
                    link
                }
            }
        }
    }
`;


const createItinerary = `
     mutation createItinerary(
        $title: String!
        $designerId: ID!,
        $slug: String!,
        $published: Boolean!,
      ){
      createItinerary(
        title: $title,
        slug: $slug,
        designerId: $designerId,
        published: $published
      ) {
        id
      }
    }`;

const updateItinerary = `
     mutation updateItinerary(
        $id: ID!,
        $title: String!
        $description: String!,
        $designerId: ID!,
        $coverImageId: String!,
        $coverImageSecret: String!,
        $budget: String!,
        $style: String!,
        $difficultyLevel: String!,
        $startDate: String!,
        $endDate: String!,
        $location: String!,
        $slug: String!,
        $published: Boolean!,
      ){
      updateItinerary(
        id: $id,
        title: $title,
        description: $description,
        designerId: $designerId,
        coverImageId: $coverImageId,
        coverImageSecret: $coverImageSecret,
        budget: $budget,
        style: $style,
        dificultyLevel: $difficultyLevel,
        startDate: $startDate,
        endDate: $endDate,
        location: $location,
        published: $published,
        slug: $slug
      ) {
        id,
        title,
        description,
        coverImageId,
        coverImageSecret,
        budget,
        style,
        dificultyLevel,
        startDate,
        endDate,
        location,
        published,
        slug
      }
    }`;


const DELETE_COVER_IMAGE = `
    mutation deleteCoverImage($coverId: ID!){
      deleteFile(id: $coverId){
        id
      }
  
    }
`;


const DELETE_ITINERARY = `
    mutation deleteItinerary($id: ID!){
      deleteItinerary(id: $id){
        id
      }
  
    }
`;




export { createItinerary, updateItinerary, GET_ITINERARY_BY_ID, DELETE_COVER_IMAGE, DELETE_ITINERARY, ALL_ITINERARIES, GET_ITINERARY_BY_SLUG, ALL_ITINERARIES_HOME };
