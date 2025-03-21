import {axiosAuthInstance, axiosNoAuthInstance} from "./axiosInstance";

const userService = {
    loginUser: (loginData) => {
        return axiosNoAuthInstance.post("/auth/token/login", loginData)
        .then((res) => {
            
            console.log("IN login function")
            console.log(res);

            return res.data})
        .catch(err => {
            //console.clear()
            console.log("In catch block 2 ")
            console.log(err)   
            throw err.response
            //console.clear()
        })
    },
    logoutUser: () => {
        return axiosAuthInstance.post("/auth/token/logout")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    registerUser: (registerData) => {
        return axiosNoAuthInstance.post("/auth/users/", registerData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },

    getUserProjects : () => {

        return axiosAuthInstance.get("/projects/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }



}

const projectService = {


    createProject : (projectData) => {

        axiosAuthInstance.post("/projects/", projectData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },

    getProjectFiles :  (project_id) =>{

      return  axiosAuthInstance.get("/projects/"+project_id+"/files/")
        .then(res => res.data)      
        .catch(err => {
            console.log(err)
            throw err.response
           
        }
        )

    },

    getProjectFileDoc : (project_id,file_id) => {

      return  axiosAuthInstance.get("/projects/"+project_id+"/files/"+file_id+"/docs-content")
        .then(res => {console.log(res.data); return res.data})      
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        }
        )

    },

    getProjectFileCode : (project_id,file_id) => {
        
        return  axiosAuthInstance.get("/projects/"+project_id+"/files/"+file_id+"/")
          .then((res) => { return res.data})      
          .catch(err => {
              console.clear()
              throw err.response
              console.clear()
          }
          )
  
      },

    getFileChunks : (project_id,file_id) => {

       return axiosAuthInstance.get("/projects/"+project_id+"/files/"+file_id+"/chunks/")
        .then(res => res.data)      
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        }
        )

    },


    getFileChunkDoc : (project_id,file_id,chunk_id) => {

      return  axiosAuthInstance.get("/projects/"+project_id+"/files/"+file_id+"/chunks/"+chunk_id+"/docs-content")
        .then(res => res.data)      
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        }
        )

    }
    ,

    getFileChunkCode : (project_id,file_id,chunk_id) => {

        return  axiosAuthInstance.get("/projects/"+project_id+"/files/"+file_id+"/chunks/"+chunk_id+"/")
          .then(res => res.data)      
          .catch(err => {
              console.clear()
              throw err.response
              console.clear()
          }
          )
  
      }
      ,

      getFileChunkDocUpdate : (project_id,file_id,chunk,text) => {
        console.log(chunk)
        return  axiosAuthInstance.put("/projects/"+project_id+"/files/"+file_id+"/chunks/"+chunk.id+"/docs",text)
          .then(res => res.data)      
          .catch(err => {
              
              throw err.response
            
          }
          )
  
      }

}



export {userService,projectService } ;