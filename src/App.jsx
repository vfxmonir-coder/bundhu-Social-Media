};
import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
getAuth,
signInCustomToken,
signInAnonymously,
onAuthStateChanged
} from 'firebase/auth';
import {
getFirestore,
collection,
addDoc,
setDoc,
getDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot,
arrayUnion,
arrayRemove
} from 'firebase/firestore';
import {
MessageCircle,
Send,
LogOut,
Mail,
Lock,
Eye,
EyeOff,
User,
Sparkles,
ThumbsUp,
Search,
Moon,
Sun,
Bell,
Trash2,
Bookmark,
Home,
X,
Upload,
Link as LinkIcon,
CheckCircle2,
Edit3,
Globe,
Share2,
Plus,
TrendingUp,
Users,
BadgeCheck,
Check,
AtSign,
Camera
} from 'lucide-react';
​const MY_FIREBASE_CONFIG = {
apiKey: "AIzaSyCrb9QS53vFoEpptP5iLeKSjGaNWToX8-Y",
authDomain: "bundu-social-media.firebaseapp.com",
projectId: "bundu-social-media",
storageBucket: "bundu-social-media.firebasestorage.app",
messagingSenderId: "795905738663",
appId: "1:795905738663:web:08b9abb7133f69abb95882",
measurementId: "G-ZE2RCKZJEB"
};
​const firebaseConfig = typeof __firebase_config !== 'undefined'
? JSON.parse(__firebase_config)
: MY_FIREBASE_CONFIG;
​const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'bondhu-production-v1';
​const TRANSLATIONS = {
bn: {
brandName: 'বন্ধু',
brandFull: 'বন্ধু (Bondhu)',
badgeText: 'নিরাপদ পাসওয়ার্ড ও ইউনিক ইউজারনেম সোশ্যাল মিডিয়া',
heroDesc: 'জিমেইল, ইউনিক ইউজারনেম ও নিজের পছন্দমতো পাসওয়ার্ড দিয়ে নিরাপদ অ্যাকাউন্ট খুলুন। ছবি, স্টোরি শেয়ার করুন এবং বন্ধুদের সাথে যুক্ত থাকুন।',
feat1: '• পাসওয়ার্ড সুরক্ষা',
feat2: '• ইউনিক ইউজারনেম',
feat3: '• প্রোফাইল ছবি আপলোড',
loginTitle: 'অ্যাকাউন্টে লগইন',
signupTitle: 'নতুন অ্যাকাউন্ট খুলুন',
tabLogin: 'লগইন করুন',
tabSignup: 'নতুন অ্যাকাউন্ট খুলুন',
fullNameLabel: 'আপনার পুরো নাম',
fullNamePlaceholder: 'যেমন: আরিফুল ইসলাম',
usernameLabel: 'ইউনিক ইউজারনেম (Username)',
usernamePlaceholder: 'যেমন: ariful_2026',
emailLabel: 'জিমেইল ঠিকানা (Gmail)',
passwordSignupLabel: 'নতুন পাসওয়ার্ড সেট করুন',
passwordLoginLabel: 'আপনার পাসওয়ার্ড',
passwordPlaceholder: 'কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড দিন',
verifying: 'যাচাই করা হচ্ছে...',
btnSignup: 'অ্যাকাউন্ট তৈরি করুন',
btnLogin: 'লগইন করুন',
orDivider: 'অথবা এক ক্লিকে দেখুন',
demoBtn: 'ডেমো অ্যাকাউন্ট দিয়ে প্রবেশ করুন',
errName: 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।',
errUsername: 'অনুগ্রহ করে একটি ইউনিক ইউজারনেম লিখুন (যেমন: rahat_2026)।',
errUsernameExists: 'এই ইউজারনেমটি ইতিমধ্যেই অন্য কেউ ব্যবহার করছে! অন্য একটি দিন।',
errEmail: 'একটি সঠিক জিমেইল (Gmail) ঠিকানা দিন।',
errPassLen: 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।',
errConnecting: 'সার্ভারের সাথে সংযোগ হচ্ছে, অনুগ্রহ করে একটু পর আবার চেষ্টা করুন।',
errEmailExists: 'এই জিমেইল দিয়ে ইতিমধ্যেই অ্যাকাউন্ট খোলা আছে! অনুগ্রহ করে লগইন করুন।',
errNoAccount: 'এই জিমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি। প্রথমে "নতুন অ্যাকাউন্ট খুলুন" ট্যাবে গিয়ে সাইন-আপ করুন।',
errWrongPass: 'ভুল পাসওয়ার্ড দিয়েছেন! সঠিক পাসওয়ার্ড দিয়ে আবার চেষ্টা করুন।',
errGenericAuth: 'তথ্য যাচাই করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।',
defaultBio: 'বন্ধু প্ল্যাটফর্মে নতুন যুক্ত হয়েছি! ✨',
welcomeSignupToast: 'অ্যাকাউন্ট তৈরি সফল হয়েছে,',
welcomeLoginToast: 'স্বাগতম,',
demoLoginToast: 'ডেমো অ্যাকাউন্ট দিয়ে লগইন হয়েছে!',
searchPlaceholder: 'পোস্ট বা বন্ধু খুঁজুন...',
notificationsTitle: 'নোটিফিকেশন',
noNotifications: 'কোনো নতুন নোটিফিকেশন নেই',
cancel: 'বাতিল',
save: 'সেভ',
bioUpdated: 'বায়ো আপডেট হয়েছে!',
navFeed: 'নিউজ ফিড',
navMyPosts: 'আমার পোস্ট',
navSaved: 'সেভড পোস্ট',
postPlaceholder: 'আপনার মনে কী চলছে?',
imageUrlPlaceholder: 'ছবির লিংক (URL) পেস্ট করুন...',
close: 'বন্ধ',
galleryPhoto: 'গ্যালারি ছবি',
photoLink: 'ছবির লিংক',
posting: 'পোস্ট হচ্ছে...',
postBtn: 'পোস্ট করুন',
postPublished: 'আপনার পোস্টটি প্রকাশিত হয়েছে!',
myPostsHeader: 'আপনার প্রকাশিত পোস্টসমূহ',
savedPostsHeader: 'আপনার সেভ করা পোস্টসমূহ',
seeAllPosts: 'সব পোস্ট দেখুন',
loadingPosts: 'পোস্ট লোড হচ্ছে...',
noPostsFound: 'কোনো পোস্ট পাওয়া যায়নি।',
reactedCount: 'জন রিয়েক্ট করেছেন',
beFirstReact: 'প্রথম রিয়েক্ট দিন',
commentsCount: 'টি কমেন্ট',
reactBtn: 'রিয়েক্ট',
commentBtn: 'কমেন্ট',
commentPlaceholder: 'একটি সুন্দর কমেন্ট লিখুন...',
justNow: 'এইমাত্র',
minAgo: 'মিনিট আগে',
hourAgo: 'ঘণ্টা আগে',
dayAgo: 'দিন আগে',
addStory: 'স্টোরি যোগ করুন',
storyPlaceholder: 'আপনার ২৪ ঘণ্টার স্টোরি লিখুন...',
publishStory: 'স্টোরি শেয়ার করুন',
storyPublished: 'আপনার স্টোরি প্রকাশিত হয়েছে!',
editPost: 'পোস্ট এডিট',
postUpdated: 'পোস্ট আপডেট হয়েছে!',
shareBtn: 'শেয়ার',
linkCopied: 'পোস্টের টেক্সট কপি হয়েছে!',
statsPosts: 'পোস্ট',
statsReacts: 'রিয়েকশন',
statsSaved: 'সেভড',
trendingTitle: 'ট্রেন্ডিং টপিকস',
activeFriendsTitle: 'সক্রিয় বন্ধুরা',
onlineNow: 'অনলাইনে আছেন',
clearFilter: 'ফিল্টার সরান',
reactions: {
like: 'লাইক',
love: 'লাভ',
haha: 'হাহা',
wow: 'ওয়াও',
sad: 'স্যাড'
}
},
en: {
brandName: 'Bondhu',
brandFull: 'Bondhu Social',
badgeText: 'Secure Password & Unique Username Social Media',
heroDesc: 'Create a secure account with Gmail, unique username, and custom password. Share stories, photos, and connect with friends.',
feat1: '• Password Security',
feat2: '• Unique Username',
feat3: '• Profile Photo Upload',
loginTitle: 'Account Login',
signupTitle: 'Create New Account',
tabLogin: 'Login',
tabSignup: 'Sign Up',
fullNameLabel: 'Full Name',
fullNamePlaceholder: 'e.g. Ariful Islam',
usernameLabel: 'Unique Username',
usernamePlaceholder: 'e.g. ariful_2026',
emailLabel: 'Gmail Address',
passwordSignupLabel: 'Set New Password',
passwordLoginLabel: 'Your Password',
passwordPlaceholder: 'Enter at least 4 characters',
verifying: 'Verifying...',
btnSignup: 'Create Account',
btnLogin: 'Login',
orDivider: 'Or try with one click',
demoBtn: 'Continue with Demo Account',
errName: 'Please enter your full name.',
errUsername: 'Please enter a unique username (e.g. rahat_2026).',
errUsernameExists: 'This username is already taken by someone else! Choose another.',
errEmail: 'Please enter a valid Gmail address.',
errPassLen: 'Password must be at least 4 characters long.',
errConnecting: 'Connecting to server, please try again shortly.',
errEmailExists: 'An account with this Gmail already exists! Please log in.',
errNoAccount: 'No account found with this Gmail. Please switch to "Sign Up" first.',
errWrongPass: 'Incorrect password! Please try again.',
errGenericAuth: 'Verification failed, please try again.',
defaultBio: 'Just joined Bondhu platform! ✨',
welcomeSignupToast: 'Account created successfully,',
welcomeLoginToast: 'Welcome back,',
demoLoginToast: 'Logged in with Demo Account!',
searchPlaceholder: 'Search posts or friends...',
notificationsTitle: 'Notifications',
noNotifications: 'No new notifications',
cancel: 'Cancel',
save: 'Save',
bioUpdated: 'Bio updated!',
navFeed: 'News Feed',
navMyPosts: 'My Posts',
navSaved: 'Saved Posts',
postPlaceholder: "What's on your mind?",
imageUrlPlaceholder: 'Paste image URL...',
close: 'Close',
galleryPhoto: 'Gallery Photo',
photoLink: 'Photo Link',
posting: 'Posting...',
postBtn: 'Post',
postPublished: 'Your post has been published!',
myPostsHeader: 'Your Published Posts',
savedPostsHeader: 'Your Saved Posts',
seeAllPosts: 'See All Posts',
loadingPosts: 'Loading posts...',
noPostsFound: 'No posts found.',
reactedCount: 'reacted',
beFirstReact: 'Be the first to react',
commentsCount: 'comments',
reactBtn: 'React',
commentBtn: 'Comment',
commentPlaceholder: 'Write a nice comment...',
justNow: 'Just now',
minAgo: 'min ago',
hourAgo: 'hr ago',
dayAgo: 'days ago',
addStory: 'Add Story',
storyPlaceholder: 'Write your 24h story...',
publishStory: 'Share Story',
storyPublished: 'Your story has been published!',
editPost: 'Edit Post',
postUpdated: 'Post updated!',
shareBtn: 'Share',
linkCopied: 'Post text copied to clipboard!',
statsPosts: 'Posts',
statsReacts: 'Reactions',
statsSaved: 'Saved',
trendingTitle: 'Trending Topics',
activeFriendsTitle: 'Active Friends',
onlineNow: 'Online now',
clearFilter: 'Clear filter',
reactions: {
like: 'Like',
love: 'Love',
haha: 'Haha',
wow: 'Wow',
sad: 'Sad'
}
}
};
​const REACTIONS = [
{ id: 'like', label: 'লাইক', emoji: '👍', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
{ id: 'love', label: 'লাভ', emoji: '❤️', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30' },
{ id: 'haha', label: 'হাহা', emoji: '😂', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
{ id: 'wow', label: 'ওয়াও', emoji: '😮', color: 'text-amber-500 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/30' },
{ id: 'sad', label: 'স্যাড', emoji: '😢', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' }
];
​const INITIAL_STORIES = [
{
id: 'st-1',
authorName: 'তানভীর আহমেদ',
username: 'tanvir_dev',
avatarImg: '',
avatar: 'TA',
avatarColor: 'bg-blue-600',
gradient: 'from-blue-600 via-indigo-600 to-purple-700',
text: 'আজকে কক্সবাজার সমুদ্র সৈকতে দারুণ সূর্যাস্ত দেখলাম! 🌅🌊',
time: Date.now() - 1800000,
verified: true
},
{
id: 'st-2',
authorName: 'নুসরাত জাহান',
username: 'nusrat_ui',
avatarImg: '',
avatar: 'NJ',
avatarColor: 'bg-emerald-600',
gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
text: 'নতুন প্রজেক্টের কাজ সফলভাবে শেষ হলো! আলহামদুলিল্লাহ 💻✨',
time: Date.now() - 3600000,
verified: true
}
];
​const ACTIVE_FRIENDS = [
{ name: 'তানভীর আহমেদ', username: 'tanvir_dev', email: 'tanvir@gmail.com', avatar: 'TA', color: 'bg-blue-600', verified: true, bio: 'ট্রাভেলার ও সফটওয়্যার ইঞ্জিনিয়ার 🌍💻' },
{ name: 'নুসরাত জাহান', username: 'nusrat_ui', email: 'nusrat@gmail.com', avatar: 'NJ', color: 'bg-emerald-600', verified: true, bio: 'UI/UX ডিজাইনার ও কন্টেন্ট ক্রিয়েটর 🎨✨' },
{ name: 'সাদিয়া ইসলাম', username: 'sadia_i', email: 'sadia@gmail.com', avatar: 'SI', color: 'bg-rose-600', verified: false, bio: 'বইপ্রেমী ও শিক্ষার্থী 📚' }
];
​const TRENDING_TAGS = ['#বন্ধু_কমিউনিটি', '#প্রযুক্তি', '#ভ্রমণ', '#ফটোগ্রাফি', '#বাংলাদেশ'];
​const SAMPLE_POSTS = [
{
id: 'sample-1',
authorName: 'তানভীর আহমেদ',
username: 'tanvir_dev',
authorEmail: 'tanvir@gmail.com',
authorAvatarImg: '',
authorAvatar: 'TA',
avatarColor: 'bg-blue-600',
verified: true,
content: 'আজকের বিকেলের আকাশটা অসাধারণ সুন্দর! সবাই কেমন আছেন? 🌤️✨ #ভ্রমণ #ফটোগ্রাফি',
imageUrl: '',
reactions: { 'demo@gmail.com': 'like' },
savedBy: [],
comments: [],
createdAt: Date.now() - 7200000,
isSample: true
}
];
​export default function App() {
const [lang, setLang] = useState('bn');
const t = TRANSLATIONS[lang];
​const [firebaseUser, setFirebaseUser] = useState(null);
const [currentUser, setCurrentUser] = useState(null);
const [authMode, setAuthMode] = useState('login');
const [loginName, setLoginName] = useState('');
const [loginUsername, setLoginUsername] = useState('');
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [signupAvatarImg, setSignupAvatarImg] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
const [loginError, setLoginError] = useState('');
​const [darkMode, setDarkMode] = useState(false);
const [activeTab, setActiveTab] = useState('feed');
const [searchQuery, setSearchQuery] = useState('');
const [isEditingBio, setIsEditingBio] = useState(false);
const [bioInput, setBioInput] = useState('');
​const [posts, setPosts] = useState([]);
const [loadingPosts, setLoadingPosts] = useState(true);
const [newPostText, setNewPostText] = useState('');
const [newPostImage, setNewPostImage] = useState('');
const [imageInputMode, setImageInputMode] = useState('none');
const [isPosting, setIsPosting] = useState(false);
const fileInputRef = useRef(null);
const signupFileInputRef = useRef(null);
const profileAvatarInputRef = useRef(null);
​const [commentInputs, setCommentInputs] = useState({});
const [expandedComments, setExpandedComments] = useState({});
const [hoveredReactionPostId, setHoveredReactionPostId] = useState(null);
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const [toastMessage, setToastMessage] = useState('');
​const [stories, setStories] = useState(INITIAL_STORIES);
const [activeStory, setActiveStory] = useState(null);
const [showCreateStory, setShowCreateStory] = useState(false);
const [newStoryText, setNewStoryText] = useState('');
const [newStoryGradient, setNewStoryGradient] = useState('from-blue-600 via-indigo-600 to-violet-700');
const [editingPostId, setEditingPostId] = useState(null);
const [editingPostText, setEditingPostText] = useState('');
const [selectedProfileModal, setSelectedProfileModal] = useState(null);
​const showToast = (msg) => {
setToastMessage(msg);
setTimeout(() => setToastMessage(''), 3000);
};
​const pushNotification = (text) => {
setNotifications(prev => [{
id: Date.now().toString(),
text,
time: Date.now(),
read: false
}, ...prev]);
};
​useEffect(() => {
const initAuth = async () => {
try {
if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
await signInCustomToken(auth, __initial_auth_token);
} else {
await signInAnonymously(auth);
}
} catch (err) {
console.error("Auth error:", err);
}
};
initAuth();
​const unsubscribe = onAuthStateChanged(auth, (user) => {
setFirebaseUser(user);
});
return () => unsubscribe();
}, []);
​useEffect(() => {
if (!firebaseUser) return;
​const postsRef = collection(db, 'artifacts', appId, 'public', 'data', 'social_posts');
​const unsubscribe = onSnapshot(
postsRef,
(snapshot) => {
const fetchedPosts = snapshot.docs.map(doc => {
const data = doc.data();
return {
id: doc.id,
...data,
reactions: data.reactions || {},
savedBy: data.savedBy || []
};
});
​fetchedPosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
​if (fetchedPosts.length === 0) {
setPosts(SAMPLE_POSTS);
} else {
setPosts(fetchedPosts);
}
setLoadingPosts(false);
},
(error) => {
console.error("Firestore read error:", error);
setPosts(SAMPLE_POSTS);
setLoadingPosts(false);
}
);
​return () => unsubscribe();
}, [firebaseUser]);
​const handleAuthSubmit = async (e) => {
e.preventDefault();
setLoginError('');
​const cleanEmail = loginEmail.trim().toLowerCase();
const cleanPassword = loginPassword.trim();
const cleanUsername = loginUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
​if (authMode === 'signup' && !loginName.trim()) {
setLoginError(t.errName);
return;
}
if (authMode === 'signup' && (!cleanUsername || cleanUsername.length < 3)) {
setLoginError(t.errUsername);
return;
}
if (!cleanEmail || !cleanEmail.includes('@')) {
setLoginError(t.errEmail);
return;
}
if (!cleanPassword || cleanPassword.length < 4) {
setLoginError(t.errPassLen);
return;
}
if (!firebaseUser) {
setLoginError(t.errConnecting);
return;
}
​setIsAuthSubmitting(true);
try {
const safeDocId = cleanEmail.replace(/[^a-z0-9]/g, '_');
const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_users', safeDocId);
const usernameDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_usernames', cleanUsername);
​if (authMode === 'signup') {
const [existingEmailSnap, existingUsernameSnap] = await Promise.all([
getDoc(userDocRef),
getDoc(usernameDocRef)
]);
​if (existingEmailSnap.exists()) {
setLoginError(t.errEmailExists);
setIsAuthSubmitting(false);
return;
}
if (existingUsernameSnap.exists()) {
setLoginError(t.errUsernameExists);
setIsAuthSubmitting(false);
return;
}
​const colors = ['bg-blue-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600', 'bg-purple-600'];
const randomColor = colors[loginName.trim().length % colors.length];
const initials = loginName
.trim()
.split(' ')
.map(n => n[0])
.join('')
.toUpperCase()
.slice(0, 2);
​const newUserProfile = {
name: loginName.trim(),
username: cleanUsername,
email: cleanEmail,
password: cleanPassword,
avatarImg: signupAvatarImg,
avatar: initials || 'U',
avatarColor: randomColor,
verified: true,
bio: t.defaultBio,
createdAt: Date.now()
};
​await Promise.all([
setDoc(userDocRef, newUserProfile),
setDoc(usernameDocRef, { email: cleanEmail, createdAt: Date.now() })
]);
​setCurrentUser(newUserProfile);
setBioInput(newUserProfile.bio);
pushNotification(${t.welcomeSignupToast} ${newUserProfile.name}!);
showToast(${t.welcomeSignupToast} ${newUserProfile.name}!);
} else {
const existingSnap = await getDoc(userDocRef);
if (!existingSnap.exists()) {
setLoginError(t.errNoAccount);
setIsAuthSubmitting(false);
return;
}
​const savedUser = existingSnap.data();
if (savedUser.password !== cleanPassword) {
setLoginError(t.errWrongPass);
setIsAuthSubmitting(false);
return;
}
​setCurrentUser(savedUser);
setBioInput(savedUser.bio || t.defaultBio);
pushNotification(${t.welcomeLoginToast} ${savedUser.name}!);
showToast(${t.welcomeLoginToast} ${savedUser.name}!);
}
​setLoginPassword('');
} catch (err) {
console.error("Auth submit error:", err);
setLoginError(t.errGenericAuth);
} finally {
setIsAuthSubmitting(false);
}
};
​const handleQuickDemoLogin = () => {
const demoObj = {
name: lang === 'bn' ? 'রাহাত কবির' : 'Rahat Kabir',
username: 'rahat_dev',
email: 'rahat.kabir@gmail.com',
avatarImg: '',
avatar: 'RK',
avatarColor: 'bg-indigo-600',
verified: true,
bio: lang === 'bn'
? 'প্রযুক্তি প্রেমী | ভ্রমণ ও ফটোগ্রাফি ভালোবাসি 📸🌍'
: 'Tech Enthusiast | Love Traveling & Photography 📸🌍'
};
setCurrentUser(demoObj);
setBioInput(demoObj.bio);
pushNotification(t.demoLoginToast);
showToast(t.demoLoginToast);
};
​const processImageFile = (file, callback) => {
if (!file || !file.type.startsWith('image/')) return;
const reader = new FileReader();
reader.onload = (event) => {
const img = new Image();
img.onload = () => {
const canvas = document.createElement('canvas');
const MAX_WIDTH = 600;
const scaleSize = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
canvas.width = img.width * scaleSize;
canvas.height = img.height * scaleSize;
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
callback(compressedDataUrl);
};
img.src = event.target.result;
};
reader.readAsDataURL(file);
};
​const handleCreatePost = async (e) => {
e.preventDefault();
if (!newPostText.trim() && !newPostImage.trim()) return;
if (!firebaseUser || !currentUser) return;
​setIsPosting(true);
try {
const postsRef = collection(db, 'artifacts', appId, 'public', 'data', 'social_posts');
await addDoc(postsRef, {
authorName: currentUser.name,
username: currentUser.username || 'user',
authorEmail: currentUser.email,
authorAvatarImg: currentUser.avatarImg || '',
authorAvatar: currentUser.avatar,
avatarColor: currentUser.avatarColor,
verified: currentUser.verified ?? true,
content: newPostText.trim(),
imageUrl: newPostImage.trim(),
reactions: {},
savedBy: [],
comments: [],
createdAt: Date.now()
});
​setNewPostText('');
setNewPostImage('');
setImageInputMode('none');
showToast(t.postPublished);
} catch (error) {
console.error("Error adding post:", error);
showToast('পোস্ট করতে সমস্যা হয়েছে।');
} finally {
setIsPosting(false);
}
};
​const handleCreateStory = (e) => {
e.preventDefault();
if (!newStoryText.trim() || !currentUser) return;
const created = {
id: st-${Date.now()},
authorName: currentUser.name,
username: currentUser.username || 'user',
avatarImg: currentUser.avatarImg || '',
avatar: currentUser.avatar,
avatarColor: currentUser.avatarColor,
gradient: newStoryGradient,
text: newStoryText.trim(),
time: Date.now(),
verified: currentUser.verified ?? true
};
setStories(prev => [created, ...prev]);
setNewStoryText('');
setShowCreateStory(false);
showToast(t.storyPublished);
};
​const handleSaveEditedPost = async (post) => {
if (!editingPostText.trim()) return;
const updatedContent = editingPostText.trim();
setEditingPostId(null);
​if (post.isSample) {
setPosts(prev => prev.map(p => p.id === post.id ? { ...p, content: updatedContent } : p));
showToast(t.postUpdated);
return;
}
​if (!firebaseUser) return;
try {
await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id), {
content: updatedContent
});
showToast(t.postUpdated);
} catch (error) {
console.error("Edit post error:", error);
}
};
​const handleSharePost = (post) => {
const shareText = ${post.authorName} (@${post.username}): "${post.content}" — ${t.brandFull};
const textArea = document.createElement('textarea');
textArea.value = shareText;
document.body.appendChild(textArea);
textArea.select();
try {
document.execCommand('copy');
showToast(t.linkCopied);
} catch (err) {
console.error('Copy failed', err);
}
document.body.removeChild(textArea);
};
​const handleDeletePost = async (post) => {
if (!currentUser || post.authorEmail !== currentUser.email) return;
​if (post.isSample) {
setPosts(prev => prev.filter(p => p.id !== post.id));
showToast('পোস্টটি মুছে ফেলা হয়েছে।');
return;
}
​if (!firebaseUser) return;
try {
await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id));
showToast('আপনার পোস্টটি ডিলিট করা হয়েছে।');
} catch (error) {
console.error("Delete post error:", error);
}
};
​const handleSelectReaction = async (post, reactionId) => {
if (!currentUser) return;
setHoveredReactionPostId(null);
​const currentReaction = post.reactions?.[currentUser.email];
const nextReaction = currentReaction === reactionId ? null : reactionId;
​if (post.isSample) {
setPosts(prevPosts => prevPosts.map(p => {
if (p.id !== post.id) return p;
const updatedReactions = { ...(p.reactions || {}) };
if (nextReaction) {
updatedReactions[currentUser.email] = nextReaction;
} else {
delete updatedReactions[currentUser.email];
}
return { ...p, reactions: updatedReactions };
}));
return;
}
​if (!firebaseUser) return;
​try {
const postRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id);
const updatedReactions = { ...(post.reactions || {}) };
if (nextReaction) {
updatedReactions[currentUser.email] = nextReaction;
} else {
delete updatedReactions[currentUser.email];
}
await updateDoc(postRef, { reactions: updatedReactions });
} catch (error) {
console.error("Reaction error:", error);
}
};
​const handleToggleSave = async (post) => {
if (!currentUser) return;
const isSaved = post.savedBy?.includes(currentUser.email);
​if (post.isSample) {
setPosts(prev => prev.map(p => {
if (p.id !== post.id) return p;
const updatedSaved = isSaved
? p.savedBy.filter(e => e !== currentUser.email)
: [...(p.savedBy || []), currentUser.email];
return { ...p, savedBy: updatedSaved };
}));
showToast(isSaved ? 'সেভ তালিকা থেকে সরানো হয়েছে' : 'পোস্টটি সেভ করা হয়েছে!');
return;
}
​if (!firebaseUser) return;
try {
const postRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id);
await updateDoc(postRef, {
savedBy: isSaved ? arrayRemove(currentUser.email) : arrayUnion(currentUser.email)
});
showToast(isSaved ? 'সেভ তালিকা থেকে সরানো হয়েছে' : 'পোস্টটি সেভ করা হয়েছে!');
} catch (error) {
console.error("Save error:", error);
}
};
​const handleAddComment = async (e, post) => {
e.preventDefault();
const commentText = commentInputs[post.id]?.trim();
if (!commentText || !currentUser) return;
​const newCommentObj = {
id: Date.now().toString(),
authorName: currentUser.name,
username: currentUser.username || 'user',
authorEmail: currentUser.email,
text: commentText,
timestamp: Date.now()
};
​setCommentInputs(prev => ({ ...prev, [post.id]: '' }));
setExpandedComments(prev => ({ ...prev, [post.id]: true }));
​if (post.isSample) {
setPosts(prevPosts => prevPosts.map(p => {
if (p.id !== post.id) return p;
return { ...p, comments: [...(p.comments || []), newCommentObj] };
}));
return;
}
​if (!firebaseUser) return;
​try {
const postRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id);
await updateDoc(postRef, {
comments: arrayUnion(newCommentObj)
});
} catch (error) {
console.error("Comment error:", error);
}
};
​const handleDeleteComment = async (post, commentObj) => {
if (!currentUser || commentObj.authorEmail !== currentUser.email) return;
​if (post.isSample) {
setPosts(prev => prev.map(p => {
if (p.id !== post.id) return p;
return { ...p, comments: p.comments.filter(c => c.id !== commentObj.id) };
}));
showToast('কমেন্ট মুছে ফেলা হয়েছে।');
return;
}
​if (!firebaseUser) return;
try {
const postRef = doc(db, 'artifacts', appId, 'public', 'data', 'social_posts', post.id);
await updateDoc(postRef, {
comments: arrayRemove(commentObj)
});
showToast('কমেন্ট ডিলিট করা হয়েছে।');
} catch (error) {
console.error("Delete comment error:", error);
}
};
​const formatTime = (timestamp) => {
if (!timestamp) return t.justNow;
const diff = Math.floor((Date.now() - timestamp) / 1000);
if (diff < 60) return t.justNow;
if (diff < 3600) return ${Math.floor(diff / 60)} ${t.minAgo};
if (diff < 86400) return ${Math.floor(diff / 3600)} ${t.hourAgo};
return ${Math.floor(diff / 86400)} ${t.dayAgo};
};
​const filteredPosts = posts.filter(post => {
if (activeTab === 'profile' && post.authorEmail !== currentUser?.email) return false;
if (activeTab === 'saved' && !post.savedBy?.includes(currentUser?.email)) return false;
​if (searchQuery.trim()) {
const q = searchQuery.toLowerCase();
const matchContent = post.content?.toLowerCase().includes(q);
const matchAuthor = post.authorName?.toLowerCase().includes(q);
const matchUsername = post.username?.toLowerCase().includes(q);
return matchContent || matchAuthor || matchUsername;
}
return true;
});
​const myPostsCount = posts.filter(p => p.authorEmail === currentUser?.email).length;
const myReceivedReactsCount = posts
.filter(p => p.authorEmail === currentUser?.email)
.reduce((sum, p) => sum + Object.keys(p.reactions || {}).length, 0);
const mySavedCount = posts.filter(p => p.savedBy?.includes(currentUser?.email)).length;
const unreadNotificationsCount = notifications.filter(n => !n.read).length;
​if (!currentUser) {
return (
<div className={darkMode ? 'dark' : ''}>
<div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center p-4 font-sans transition-colors">
<div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
​<div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
<div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
<div className="relative z-10">
<div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
<Sparkles className="w-4 h-4 text-amber-300" />
<span>{t.badgeText}</span>
</div>
<h1 className="text-4xl font-extrabold tracking-tight mb-4">
{t.brandFull}
</h1>
<p className="text-blue-100 text-base md:text-lg leading-relaxed">
{t.heroDesc}
</p>
</div>
​<div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-xs text-blue-200">
<span>{t.feat1}</span>
<span>{t.feat2}</span>
<span>{t.feat3}</span>
</div>
</div>
​<div className="p-8 md:p-10 flex flex-col justify-center">
<div className="flex items-center justify-between mb-4 gap-2">
<h2 className="text-2xl font-bold text-slate-800 dark:text-white">
{authMode === 'login' ? t.loginTitle : t.signupTitle}
</h2>
<div className="flex items-center gap-1.5">
<button
type="button"
onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
className="px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
>
<Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
<span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
</button>
<button
type="button"
onClick={() => setDarkMode(!darkMode)}
className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
>
{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</button>
</div>
</div>
​<div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
<button
type="button"
onClick={() => { setAuthMode('login'); setLoginError(''); }}
className={py-2 text-xs sm:text-sm font-semibold rounded-lg transition cursor-pointer ${ authMode === 'login' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400' }}
>
{t.tabLogin}
</button>
<button
type="button"
onClick={() => { setAuthMode('signup'); setLoginError(''); }}
className={py-2 text-xs sm:text-sm font-semibold rounded-lg transition cursor-pointer ${ authMode === 'signup' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400' }}
>
{t.tabSignup}
</button>
</div>
​{loginError && (
<div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs sm:text-sm rounded-xl">
{loginError}
</div>
)}
​<form onSubmit={handleAuthSubmit} className="space-y-3.5">
{authMode === 'signup' && (
<>
<div className="flex items-center gap-4 mb-2">
<div className="relative">
{signupAvatarImg ? (
<img src={signupAvatarImg} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-sm" />
) : (
<div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xl border-2 border-dashed border-blue-400">
<User className="w-7 h-7" />
</div>
)}
<button
type="button"
onClick={() => signupFileInputRef.current?.click()}
className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 cursor-pointer"
>
<Camera className="w-3.5 h-3.5" />
</button>
<input
ref={signupFileInputRef}
type="file"
accept="image/*"
onChange={(e) => processImageFile(e.target.files?.[0], setSignupAvatarImg)}
className="hidden"
/>
</div>
<div className="flex-1">
<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">প্রোফাইল ছবি (ঐচ্ছিক)</label>
<p className="text-[11px] text-slate-400">গ্যালারি থেকে নিজের পছন্দমতো ছবি সেট করতে ক্যামেরায় ক্লিক করুন।</p>
</div>
</div>
​<div>
<label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t.fullNameLabel}</label>
<div className="relative">
<User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input
type="text"
placeholder={t.fullNamePlaceholder}
value={loginName}
onChange={(e) => setLoginName(e.target.value)}
className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>
</div>
​<div>
<label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t.usernameLabel}</label>
<div className="relative">
<AtSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input
type="text"
placeholder={t.usernamePlaceholder}
value={loginUsername}
onChange={(e) => setLoginUsername(e.target.value)}
className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>
</div>
</>
)}
​<div>
<label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t.emailLabel}</label>
<div className="relative">
<Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input
type="email"
placeholder="example@gmail.com"
value={loginEmail}
onChange={(e) => setLoginEmail(e.target.value)}
className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>
</div>
​<div>
<label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
{authMode === 'signup' ? t.passwordSignupLabel : t.passwordLoginLabel}
</label>
<div className="relative">
<Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input
type={showPassword ? 'text' : 'password'}
placeholder={t.passwordPlaceholder}
value={loginPassword}
onChange={(e) => setLoginPassword(e.target.value)}
className="w-full pl-9 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
>
{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
</button>
</div>
</div>
​<button
type="submit"
disabled={isAuthSubmitting}
className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
>
<span>
{isAuthSubmitting
? t.verifying
: authMode === 'signup'
? t.btnSignup
: t.btnLogin}
</span>
</button>
</form>
​<div className="relative my-4">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
</div>
<div className="relative flex justify-center text-xs uppercase">
<span className="bg-white dark:bg-slate-900 px-2 text-slate-400">{t.orDivider}</span>
</div>
</div>
​<button
type="button"
onClick={handleQuickDemoLogin}
className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition text-xs sm:text-sm cursor-pointer"
>
{t.demoBtn}
</button>
</div>
</div>
</div>
</div>
);
}
​return (
<div className={darkMode ? 'dark' : ''}>
<div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16 transition-colors">
​{toastMessage && (
<div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-blue-600 text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2">
<CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-white" />
<span>{toastMessage}</span>
</div>
)}
​{activeStory && (
<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
<div className={max-w-sm w-full h-[460px] rounded-3xl bg-gradient-to-br ${activeStory.gradient} text-white p-6 flex flex-col justify-between shadow-2xl relative}>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
{activeStory.avatarImg ? (
<img src={activeStory.avatarImg} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
) : (
<div className={w-10 h-10 rounded-full ${activeStory.avatarColor} border-2 border-white font-bold flex items-center justify-center}>
{activeStory.avatar}
</div>
)}
<div>
<div className="flex items-center gap-1 font-bold text-sm">
<span>{activeStory.authorName}</span>
{activeStory.verified && <BadgeCheck className="w-4 h-4 text-sky-300" />}
</div>
<span className="text-xs text-white/80">@{activeStory.username || 'user'} • {formatTime(activeStory.time)}</span>
</div>
</div>
<button onClick={() => setActiveStory(null)} className="p-2 rounded-full bg-black/25 hover:bg-black/40 cursor-pointer">
<X className="w-5 h-5" />
</button>
</div>
​<div className="my-auto text-center px-2">
<p className="text-xl sm:text-2xl font-bold leading-relaxed drop-shadow">
{activeStory.text}
</p>
</div>
​<div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
<div className="bg-white h-full w-full"></div>
</div>
</div>
</div>
)}
​{showCreateStory && (
<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
<div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
<div className="flex items-center justify-between mb-4">
<h3 className="font-bold text-lg">{t.addStory}</h3>
<button onClick={() => setShowCreateStory(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
<X className="w-5 h-5" />
</button>
</div>
<form onSubmit={handleCreateStory} className="space-y-4">
<div className={h-48 rounded-2xl bg-gradient-to-br ${newStoryGradient} p-5 flex items-center justify-center}>
<textarea
rows="3"
placeholder={t.storyPlaceholder}
value={newStoryText}
onChange={(e) => setNewStoryText(e.target.value)}
className="w-full bg-transparent text-white placeholder-white/75 text-center font-bold text-lg focus:outline-none resize-none"
/>
</div>
<div className="flex items-center justify-center gap-2">
{[
'from-blue-600 via-indigo-600 to-violet-700',
'from-emerald-500 via-teal-600 to-cyan-700',
'from-rose-500 via-pink-600 to-amber-600',
'from-slate-800 via-slate-900 to-black'
].map((grad) => (
<button
key={grad}
type="button"
onClick={() => setNewStoryGradient(grad)}
className={w-8 h-8 rounded-full bg-gradient-to-br ${grad} border-2 ${ newStoryGradient === grad ? 'border-blue-500 scale-110' : 'border-transparent' } transition cursor-pointer}
/>
))}
</div>
<button
type="submit"
disabled={!newStoryText.trim()}
className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition cursor-pointer"
>
{t.publishStory}
</button>
</form>
</div>
</div>
)}
​{selectedProfileModal && (
<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
<div className="bg-white dark:bg-slate-900 max-w-sm w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
<div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
<button
onClick={() => setSelectedProfileModal(null)}
className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 cursor-pointer"
>
<X className="w-4 h-4" />
</button>
</div>
<div className="px-6 pb-6 -mt-10 text-center">
{selectedProfileModal.avatarImg ? (
<img src={selectedProfileModal.avatarImg} alt="" className="w-20 h-20 mx-auto rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md" />
) : (
<div className={w-20 h-20 mx-auto rounded-2xl ${selectedProfileModal.color || 'bg-blue-600'} text-white text-2xl font-bold flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-md}>
{selectedProfileModal.avatar}
</div>
)}
<div className="mt-3 flex items-center justify-center gap-1.5">
<h3 className="font-bold text-lg">{selectedProfileModal.name}</h3>
{selectedProfileModal.verified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
</div>
<p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">@{selectedProfileModal.username || 'user'}</p>
<p className="mt-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
{selectedProfileModal.bio || t.defaultBio}
</p>
<button
onClick={() => {
setSearchQuery(selectedProfileModal.username || selectedProfileModal.name);
setSelectedProfileModal(null);
}}
className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
>
{t.seeAllPosts}
</button>
</div>
</div>
</div>
)}
​<header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
<div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
​<div className="flex items-center gap-3 flex-1 max-w-md">
<button
onClick={() => { setActiveTab('feed'); setSearchQuery(''); }}
className="flex items-center gap-2 shrink-0 cursor-pointer"
>
<div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
{lang === 'bn' ? 'ব' : 'B'}
</div>
<span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight hidden sm:inline">
{t.brandName}
</span>
</button>
​<div className="relative flex-1">
<Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
<input
type="text"
placeholder={t.searchPlaceholder}
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full bg-slate-100 dark:bg-slate-800 text-sm rounded-full pl-9 pr-8 py-2 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
/>
{searchQuery && (
<button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
<X className="w-3.5 h-3.5" />
</button>
)}
</div>
</div>
​<div className="flex items-center gap-1.5 sm:gap-2">
<button
onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
className="px-2.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
>
<Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
<span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
</button>
​<button
onClick={() => setDarkMode(!darkMode)}
className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
>
{darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
</button>
​<div className="relative">
<button
onClick={() => {
setShowNotifications(!showNotifications);
setNotifications(prev => prev.map(n => ({ ...n, read: true })));
}}
className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer relative"
>
<Bell className="w-4 h-4" />
{unreadNotificationsCount > 0 && (
<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
)}
</button>
​{showNotifications && (
<div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
<div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
<span className="font-bold text-sm">{t.notificationsTitle}</span>
<button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
<X className="w-4 h-4" />
</button>
</div>
{notifications.length === 0 ? (
<p className="text-xs text-slate-400 py-4 text-center">{t.noNotifications}</p>
) : (
<div className="space-y-2 max-h-60 overflow-y-auto">
{notifications.map(n => (
<div key={n.id} className="text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70">
<p className="text-slate-700 dark:text-slate-200">{n.text}</p>
<span className="text-[10px] text-slate-400 mt-1 block">{formatTime(n.time)}</span>
</div>
))}
</div>
)}
</div>
)}
</div>
​<button
onClick={() => setActiveTab('profile')}
className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 py-1.5 px-2.5 sm:px-3 rounded-full transition cursor-pointer"
>
{currentUser.avatarImg ? (
<img src={currentUser.avatarImg} alt="" className="w-7 h-7 rounded-full object-cover" />
) : (
<div className={w-7 h-7 rounded-full ${currentUser.avatarColor} text-white text-xs font-bold flex items-center justify-center}>
{currentUser.avatar}
</div>
)}
<span className="hidden md:inline text-xs font-bold">{currentUser.name}</span>
</button>
​<button
onClick={() => setCurrentUser(null)}
className="p-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-full transition cursor-pointer"
>
<LogOut className="w-4 h-4" />
</button>
</div>
</div>
</header>
​<div className="max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
​<aside className="lg:col-span-3 space-y-4">
<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
<div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
<button
onClick={() => profileAvatarInputRef.current?.click()}
className="absolute bottom-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition cursor-pointer"
title="প্রোফাইল ছবি পরিবর্তন করুন"
>
<Camera className="w-3.5 h-3.5" />
</button>
<input
ref={profileAvatarInputRef}
type="file"
accept="image/*"
onChange={(e) => processImageFile(e.target.files?.[0], async (newImg) => {
setCurrentUser(prev => ({ ...prev, avatarImg: newImg }));
showToast('প্রোফাইল ছবি আপডেট হয়েছে!');
if (firebaseUser && currentUser.email !== 'rahat.kabir@gmail.com') {
try {
const safeDocId = currentUser.email.replace(/[^a-z0-9]/g, '_');
await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'social_users', safeDocId), {
avatarImg: newImg
});
} catch (err) {
console.error(err);
}
}
})}
className="hidden"
/>
</div>
​<div className="px-5 pb-5 -mt-8">
{currentUser.avatarImg ? (
<img src={currentUser.avatarImg} alt="" className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md" />
) : (
<div className={w-16 h-16 rounded-2xl ${currentUser.avatarColor} text-white text-xl font-bold flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-md}>
{currentUser.avatar}
</div>
)}
​<div className="mt-2.5">
<div className="flex items-center gap-1.5">
<h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{currentUser.name}</h2>
{currentUser.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />}
</div>
<p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">@{currentUser.username || 'user'}</p>
</div>
​<div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 text-center">
<div>
<div className="font-extrabold text-sm text-slate-900 dark:text-white">{myPostsCount}</div>
<div className="text-[11px] text-slate-400">{t.statsPosts}</div>
</div>
<div className="border-x border-slate-100 dark:border-slate-800">
<div className="font-extrabold text-sm text-blue-600 dark:text-blue-400">{myReceivedReactsCount}</div>
<div className="text-[11px] text-slate-400">{t.statsReacts}</div>
</div>
<div>
<div className="font-extrabold text-sm text-amber-500">{mySavedCount}</div>
<div className="text-[11px] text-slate-400">{t.statsSaved}</div>
</div>
</div>
​<div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
{isEditingBio ? (
<div className="space-y-2">
<textarea
rows="2"
value={bioInput}
onChange={(e) => setBioInput(e.target.value)}
className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 focus:outline-none"
/>
<div className="flex justify-end gap-1.5">
<button onClick={() => setIsEditingBio(false)} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600">{t.cancel}</button>
<button
onClick={async () => {
const updatedBio = bioInput.trim() || currentUser.bio;
setCurrentUser(prev => ({ ...prev, bio: updatedBio }));
setIsEditingBio(false);
if (firebaseUser && currentUser.email !== 'rahat.kabir@gmail.com') {
try {
const safeDocId = currentUser.email.replace(/[^a-z0-9]/g, '_');
await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'social_users', safeDocId), {
bio: updatedBio
});
} catch (e) {
console.error(e);
}
}
showToast(t.bioUpdated);
}}
className="text-xs px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium"
>
{t.save}
</button>
</div>
</div>
) : (
<div className="flex items-start justify-between gap-2">
<p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
{currentUser.bio}
</p>
<button onClick={() => setIsEditingBio(true)} className="text-slate-400 hover:text-blue-600 p-1 shrink-0 cursor-pointer">
<Edit3 className="w-3.5 h-3.5" />
</button>
</div>
)}
</div>
</div>
</div>
​<nav className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 flex lg:flex-col gap-1">
<button
onClick={() => setActiveTab('feed')}
className={flex-1 flex items-center justify-center lg:justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${ activeTab === 'feed' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50' }}
>
<Home className="w-4 h-4" />
<span>{t.navFeed}</span>
</button>
​<button
onClick={() => setActiveTab('profile')}
className={flex-1 flex items-center justify-center lg:justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${ activeTab === 'profile' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50' }}
>
<User className="w-4 h-4" />
<span>{t.navMyPosts}</span>
</button>
​<button
onClick={() => setActiveTab('saved')}
className={flex-1 flex items-center justify-center lg:justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${ activeTab === 'saved' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50' }}
>
<Bookmark className="w-4 h-4" />
<span>{t.navSaved}</span>
</button>
</nav>
</aside>
​<main className="lg:col-span-6 space-y-5">
​<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-3.5">
<div className="flex items-center gap-3 overflow-x-auto pb-1">
<button
type="button"
onClick={() => setShowCreateStory(true)}
className="w-24 h-36 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-blue-400 flex flex-col items-center justify-center gap-2 shrink-0 hover:bg-blue-50 transition p-2 cursor-pointer"
>
<div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
<Plus className="w-5 h-5" />
</div>
<span className="text-xs font-bold text-center text-slate-700 dark:text-slate-200 leading-tight">
{t.addStory}
</span>
</button>
​{stories.map((story) => (
<button
key={story.id}
type="button"
onClick={() => setActiveStory(story)}
className={w-24 h-36 rounded-2xl bg-gradient-to-br ${story.gradient} text-white p-2.5 flex flex-col justify-between shrink-0 shadow-sm hover:scale-[1.02] transition text-left cursor-pointer}
>
{story.avatarImg ? (
<img src={story.avatarImg} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
) : (
<div className={w-8 h-8 rounded-full ${story.avatarColor} border-2 border-white text-xs font-bold flex items-center justify-center}>
{story.avatar}
</div>
)}
<p className="text-[11px] font-semibold line-clamp-2 leading-snug">
{story.text}
</p>
<span className="text-[10px] font-bold truncate opacity-90">
{story.authorName.split(' ')[0]}
</span>
</button>
))}
</div>
</div>
​{activeTab !== 'saved' && (
<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
<form onSubmit={handleCreatePost}>
<div className="flex gap-3">
{currentUser.avatarImg ? (
<img src={currentUser.avatarImg} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
) : (
<div className={w-10 h-10 rounded-full ${currentUser.avatarColor} text-white font-bold flex items-center justify-center shrink-0}>
{currentUser.avatar}
</div>
)}
<textarea
rows="2"
placeholder={${currentUser.name}, ${t.postPlaceholder}}
value={newPostText}
onChange={(e) => setNewPostText(e.target.value)}
className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 focus:bg-white rounded-2xl px-4 py-2.5 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
/>
</div>
​{newPostImage && (
<div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
<img src={newPostImage} alt="Preview" className="max-h-64 w-full object-cover" />
<button
type="button"
onClick={() => setNewPostImage('')}
className="absolute top-2 right-2 bg-slate-900/75 text-white p-1.5 rounded-full hover:bg-rose-600 transition cursor-pointer"
>
<X className="w-4 h-4" />
</button>
</div>
)}
​{imageInputMode === 'url' && (
<div className="mt-3 flex gap-2">
<input
type="url"
placeholder={t.imageUrlPlaceholder}
value={newPostImage}
onChange={(e) => setNewPostImage(e.target.value)}
className="flex-1 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none"
/>
<button
type="button"
onClick={() => setImageInputMode('none')}
className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500"
>
{t.close}
</button>
</div>
)}
​<input
ref={fileInputRef}
type="file"
accept="image/*"
onChange={(e) => processImageFile(e.target.files?.[0], (imgUrl) => {
setNewPostImage(imgUrl);
setImageInputMode('none');
showToast('ছবি সংযুক্ত করা হয়েছে!');
})}
className="hidden"
/>
​<div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-1.5">
<button
type="button"
onClick={() => fileInputRef.current?.click()}
className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
>
<Upload className="w-4 h-4 text-emerald-600" />
<span>{t.galleryPhoto}</span>
</button>
​<button
type="button"
onClick={() => setImageInputMode(imageInputMode === 'url' ? 'none' : 'url')}
className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
>
<LinkIcon className="w-4 h-4 text-blue-600" />
<span>{t.photoLink}</span>
</button>
</div>
​<button
type="submit"
disabled={isPosting || (!newPostText.trim() && !newPostImage.trim())}
className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-5 py-2 rounded-xl text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
>
<span>{isPosting ? t.posting : t.postBtn}</span>
<Send className="w-4 h-4" />
</button>
</div>
</form>
</div>
)}
​{activeTab !== 'feed' && (
<div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800">
<span className="font-bold text-sm">
{activeTab === 'profile' ? t.myPostsHeader : t.savedPostsHeader}
</span>
<button onClick={() => setActiveTab('feed')} className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">
{t.seeAllPosts}
</button>
</div>
)}
​{loadingPosts ? (
<div className="text-center py-12 text-slate-500">{t.loadingPosts}</div>
) : filteredPosts.length === 0 ? (
<div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-800">
<p className="text-slate-500 dark:text-slate-400 text-sm">{t.noPostsFound}</p>
</div>
) : (
<div className="space-y-5">
{filteredPosts.map((post) => {
const reactionsMap = post.reactions || {};
const totalReactions = Object.keys(reactionsMap).length;
const userReactionId = reactionsMap[currentUser.email];
const activeReactionObj = REACTIONS.find(r => r.id === userReactionId);
​const uniqueEmojis = [...new Set(Object.values(reactionsMap))]
.map(rId => REACTIONS.find(r => r.id === rId)?.emoji)
.filter(Boolean);
​const commentsCount = post.comments?.length || 0;
const isCommentsOpen = expandedComments[post.id] || commentsCount > 0;
const isOwnPost = post.authorEmail === currentUser.email;
const isSaved = post.savedBy?.includes(currentUser.email);
​return (
<article key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-visible transition-colors">
​<div className="p-4 flex items-center justify-between">
<div
onClick={() => setSelectedProfileModal({
name: post.authorName,
username: post.username,
email: post.authorEmail,
avatarImg: post.authorAvatarImg,
avatar: post.authorAvatar,
color: post.avatarColor,
verified: post.verified,
bio: post.authorEmail === currentUser.email ? currentUser.bio : undefined
})}
className="flex items-center gap-3 cursor-pointer group"
>
{post.authorAvatarImg ? (
<img src={post.authorAvatarImg} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
) : (
<div className={w-10 h-10 rounded-full ${post.avatarColor || 'bg-blue-600'} text-white font-bold flex items-center justify-center shrink-0}>
{post.authorAvatar || 'U'}
</div>
)}
<div>
<div className="flex items-center gap-1">
<h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight group-hover:text-blue-600 transition">
{post.authorName}
</h3>
{post.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />}
</div>
<p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
<span className="text-blue-600 dark:text-blue-400 font-semibold">@{post.username || 'user'}</span>
<span>•</span>
<span>{formatTime(post.createdAt)}</span>
</p>
</div>
</div>
​<div className="flex items-center gap-1">
<button
onClick={() => handleToggleSave(post)}
className={p-2 rounded-full transition cursor-pointer ${ isSaved ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' }}
>
<Bookmark className={w-4 h-4 ${isSaved ? 'fill-current' : ''}} />
</button>
​{isOwnPost && (
<>
<button
onClick={() => {
setEditingPostId(post.id);
setEditingPostText(post.content);
}}
className="p-2 text-slate-400 hover:text-blue-600 rounded-full transition cursor-pointer"
>
<Edit3 className="w-4 h-4" />
</button>
<button
onClick={() => handleDeletePost(post)}
className="p-2 text-slate-400 hover:text-rose-600 rounded-full transition cursor-pointer"
>
<Trash2 className="w-4 h-4" />
</button>
</>
)}
</div>
</div>
​{editingPostId === post.id ? (
<div className="px-4 pb-3 space-y-2">
<textarea
rows="3"
value={editingPostText}
onChange={(e) => setEditingPostText(e.target.value)}
className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-blue-400 rounded-xl p-3 focus:outline-none"
/>
<div className="flex justify-end gap-2">
<button onClick={() => setEditingPostId(null)} className="px-3 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800">{t.cancel}</button>
<button
onClick={() => handleSaveEditedPost(post)}
className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-1 cursor-pointer"
>
<Check className="w-3.5 h-3.5" />
<span>{t.save}</span>
</button>
</div>
</div>
) : (
post.content && (
<div className="px-4 pb-3">
<p className="text-slate-800 dark:text-slate-200 whitespace-pre-line text-sm sm:text-base leading-relaxed">
{post.content}
</p>
</div>
)
)}
​{post.imageUrl && (
<div className="bg-slate-100 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
<img
src={post.imageUrl}
alt="Post attachment"
className="w-full max-h-[420px] object-cover"
onError={(e) => { e.target.style.display = 'none'; }}
/>
</div>
)}
​<div className="px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
<div className="flex items-center gap-1.5">
{totalReactions > 0 ? (
<>
<div className="flex -space-x-1">
{uniqueEmojis.map((emoji, idx) => (
<span key={idx} className="text-sm">{emoji}</span>
))}
</div>
<span className="font-medium">{totalReactions} {t.reactedCount}</span>
</>
) : (
<span>{t.beFirstReact}</span>
)}
</div>
​<button onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))} className="hover:underline cursor-pointer">
{commentsCount} {t.commentsCount}
</button>
</div>
​<div
className="px-2 py-1 grid grid-cols-3 gap-1 border-b border-slate-100 dark:border-slate-800 relative"
onMouseLeave={() => setHoveredReactionPostId(null)}
>
{hoveredReactionPostId === post.id && (
<div className="absolute -top-12 left-3 z-30 bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1.5 flex items-center gap-2">
{REACTIONS.map((reaction) => (
<button
key={reaction.id}
type="button"
onClick={() => handleSelectReaction(post, reaction.id)}
title={t.reactions[reaction.id]}
className="text-xl hover:scale-125 transition-transform cursor-pointer px-1"
>
{reaction.emoji}
</button>
))}
</div>
)}
​<button
type="button"
onMouseEnter={() => setHoveredReactionPostId(post.id)}
onClick={() => handleSelectReaction(post, userReactionId || 'like')}
className={py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${ activeReactionObj ? ${activeReactionObj.color} ${activeReactionObj.bg} : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }}
>
{activeReactionObj ? (
<>
<span className="text-base">{activeReactionObj.emoji}</span>
<span>{t.reactions[activeReactionObj.id]}</span>
</>
) : (
<>
<ThumbsUp className="w-4 h-4" />
<span>{t.reactBtn}</span>
</>
)}
</button>
​<button
type="button"
onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
className="py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
>
<MessageCircle className="w-4 h-4" />
<span>{t.commentBtn}</span>
</button>
​<button
type="button"
onClick={() => handleSharePost(post)}
className="py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
>
<Share2 className="w-4 h-4" />
<span>{t.shareBtn}</span>
</button>
</div>
​{isCommentsOpen && (
<div className="bg-slate-50/70 dark:bg-slate-950/40 p-4 space-y-3 rounded-b-2xl">
{post.comments && post.comments.length > 0 && (
<div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
{post.comments.map((comment) => {
const isOwnComment = comment.authorEmail === currentUser.email;
return (
<div key={comment.id} className="flex gap-2.5 items-start">
<div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
{comment.authorName?.[0]?.toUpperCase() || 'U'}
</div>
<div className="bg-slate-200/70 dark:bg-slate-800 rounded-2xl px-3.5 py-2 flex-1">
<div className="flex items-center justify-between gap-2">
<span className="text-xs font-bold text-slate-900 dark:text-white">
{comment.authorName} <span className="text-[10px] text-blue-600">@{comment.username}</span>
</span>
<div className="flex items-center gap-2">
<span className="text-[10px] text-slate-400">{formatTime(comment.timestamp)}</span>
{isOwnComment && (
<button onClick={() => handleDeleteComment(post, comment)} className="text-slate-400 hover:text-rose-500 cursor-pointer">
<Trash2 className="w-3 h-3" />
</button>
)}
</div>
</div>
<p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">{comment.text}</p>
</div>
</div>
);
})}
</div>
)}
​<form onSubmit={(e) => handleAddComment(e, post)} className="flex items-center gap-2 pt-1">
{currentUser.avatarImg ? (
<img src={currentUser.avatarImg} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
) : (
<div className={w-8 h-8 rounded-full ${currentUser.avatarColor} text-white text-xs font-bold flex items-center justify-center shrink-0}>
{currentUser.avatar}
</div>
)}
<div className="flex-1 relative">
<input
type="text"
placeholder={t.commentPlaceholder}
value={commentInputs[post.id] || ''}
onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full pl-4 pr-10 py-1.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<button
type="submit"
disabled={!commentInputs[post.id]?.trim()}
className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-slate-300 hover:text-blue-700 p-1 cursor-pointer"
>
<Send className="w-4 h-4" />
</button>
</div>
</form>
</div>
)}
​</article>
);
})}
</div>
)}
</main>
​<aside className="lg:col-span-3 space-y-4">
<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
<TrendingUp className="w-4 h-4 text-blue-600" />
<span>{t.trendingTitle}</span>
</div>
{searchQuery && (
<button onClick={() => setSearchQuery('')} className="text-[11px] text-rose-500 hover:underline cursor-pointer">
{t.clearFilter}
</button>
)}
</div>
<div className="flex flex-wrap gap-1.5">
{TRENDING_TAGS.map((tag) => (
<button
key={tag}
type="button"
onClick={() => setSearchQuery(tag)}
className={text-xs px-3 py-1.5 rounded-full font-medium transition cursor-pointer ${ searchQuery === tag ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' }}
>
{tag}
</button>
))}
</div>
</div>
​<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
<div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-3">
<Users className="w-4 h-4 text-emerald-600" />
<span>{t.activeFriendsTitle}</span>
</div>
<div className="space-y-3">
{ACTIVE_FRIENDS.map((friend) => (
<button
key={friend.email}
type="button"
onClick={() => setSelectedProfileModal(friend)}
className="w-full flex items-center gap-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1.5 rounded-xl transition cursor-pointer"
>
<div className="relative shrink-0">
<div className={w-9 h-9 rounded-full ${friend.color} text-white text-xs font-bold flex items-center justify-center}>
{friend.avatar}
</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
</div>
<div className="min-w-0 flex-1">
<div className="flex items-center gap-1">
<span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{friend.name}</span>
{friend.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
</div>
<span className="text-[11px] text-blue-600 dark:text-blue-400 block font-semibold">@{friend.username}</span>
</div>
</button>
))}
</div>
</div>
</aside>
​</div>
</div>
</div>
);
}
