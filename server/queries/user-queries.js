
const SignInUser = `
     mutation SignInUser($email: String!, $password: String!){
      signinUser(
        email: {
            email: $email,
            password : $password
          }
      ) {
        token,
        user{
            id
        }
      }
    }`;


const User = `
    query User($id: ID!){
        User(
            id: $id
        ){
            id,
            name,
            email,
            description,
            avatar,
            itineraries{
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
          }
    }
    `;


export { SignInUser, User};
