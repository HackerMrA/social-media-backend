const express=require('express'),
      router=express.Router();
const {userById,allUser,getUser,updateUser,deleteUser,userPhoto,addFollowing,addFollower,removeFollower,removeFollowing,findPeople}=require('../controllers/user');
const {requireSignin}=require('../controllers/auth');


router.put('/user/follow',requireSignin,addFollowing,addFollower);
router.put('/user/unfollow',requireSignin,removeFollowing,removeFollower);
router.get('/users',allUser);
router.get('/user/:userId',requireSignin,getUser);
router.put('/user/:userId',requireSignin,updateUser);
router.delete('/user/:userId',requireSignin,deleteUser);
router.get("/user/photo/:userId",userPhoto);
//who to follow
router.get('/user/findpeople/:userId',requireSignin,findPeople);

router.param("userId",userById);


module.exports=router;