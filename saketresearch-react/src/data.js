/* ========= EDIT YOUR CONTENT HERE ========= */
const SITE = { email: "your.email@example.com" }; // TODO: set real email
const SOCIALS = [ // TODO: replace "#" placeholders with real profile URLs
  {name:"Google Scholar",icon:"bi-mortarboard",url:"#"},
  {name:"LinkedIn",icon:"bi-linkedin",url:"#"},
  {name:"GitHub",icon:"bi-github",url:"#"},
  {name:"ORCID",icon:"bi-person-badge",url:"#"},
  {name:"Email",icon:"bi-envelope",url:"mailto:"+SITE.email}
];
const STATS = [ // counts from content listed on this site; update as verified
  {label:"Research Publications",value:2},{label:"Conference Papers",value:2},
  {label:"Research Projects",value:6},{label:"Research Areas",value:10}
];
const INTERESTS = [
 ["bi-heart-pulse","Biomedical Artificial Intelligence","AI methods for analysing biomedical data and supporting clinical insight."],
 ["bi-activity","EEG Signal Processing","Feature extraction and modelling of electroencephalography signals."],
 ["bi-cpu","Brain-Computer Interfaces","Decoding neural activity for communication and control."],
 ["bi-soundwave","Neural Speech Reconstruction","Reconstructing speech-related information from neural signals."],
 ["bi-diagram-3","Deep Learning","Neural architectures for signals, images and speech."],
 ["bi-file-medical","Medical Image Analysis","Enhancement and classification of medical images."],
 ["bi-mic","Speech Intelligibility Prediction","Estimating how intelligible speech is using learned representations."],
 ["bi-layers","Multimodal Learning","Fusing complementary signal representations."],
 ["bi-eye","Computer Vision","Visual recognition models for biomedical applications."],
 ["bi-hospital","AI for Healthcare","Intelligent systems supporting healthcare."]
];
const PROJECTS = [ // github: "" hides the GitHub button
 {title:"WHG-Mamba — 3T to 7T MRI Enhancement",cat:"Medical AI",tags:["Medical Image Analysis","Mamba","Deep Learning","MRI Enhancement"],tech:["Wavelets","Hypergraph Conv","Mamba"],github:"",img:"",desc:"A deep learning framework for enhancing 3T T2-weighted brain MRI toward 7T-quality imaging using paired 3T T1-weighted and T2-weighted inputs. The architecture integrates wavelet-based features, hypergraph convolution, feature modulation, and Mamba-based modeling."},
 {title:"HYFuse-SER — Hyperbolic EEG Fusion",cat:"EEG",tags:["EEG","Multimodal Fusion","Hyperbolic Learning","Emotion Recognition"],tech:["Raw EEG","Mel-spectrogram","PSD"],github:"",img:"",desc:"A multimodal EEG emotion recognition framework integrating raw EEG signals, Mel-spectrogram representations, and power spectral density features using hyperbolic fusion."},
 {title:"EEG-Based Neural Speech Reconstruction",cat:"EEG",tags:["EEG","Speech Reconstruction","Neural Signal Processing","Deep Learning"],tech:["Gamma-band TF features","Neural speech generation"],github:"",img:"",desc:"Research on reconstructing speech-related information from EEG signals using deep learning, gamma-band time-frequency features, and neural speech generation frameworks."},
 {title:"EEG-Based Speech Intelligibility Prediction",cat:"Speech",tags:["Speech Processing","Whisper","BiLSTM","Intelligibility Prediction"],tech:["Whisper","BiLSTM"],github:"",img:"",desc:"A deep learning approach combining Whisper-based speech representations and BiLSTM modeling to estimate speech intelligibility."},
 {title:"Motor Imagery EEG Classification",cat:"EEG",tags:["BCI","EEG","Motor Imagery","Deep Learning"],tech:["Cross-subject evaluation"],github:"",img:"",desc:"An EEG-based brain-computer interface framework for classifying motor imagery tasks using deep learning and cross-subject evaluation."},
 {title:"GastroPathNet",cat:"Medical AI",tags:["Medical AI","Computer Vision","Attention Mechanisms","Cancer Classification"],tech:["Multi-scale attention"],github:"",img:"",desc:"A multi-scale attention-based deep learning framework for gastric cancer classification using medical image analysis."}
];
const PUBLICATIONS = [ // empty fields are hidden automatically
 {title:"Reducing Aircraft Downtime with Predictive Maintenance: A Data-Driven Approach for Airbus A320",authors:"",venue:"ICETCI 2025",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/ICETCI67340.2025.11257885",abstract:"",keywords:[],pdf:"",scholar:""},
 {title:"Exploiting EEG-based Gamma-Band Time Frequency Feature in WaveNet Decoder Framework for High-Fidelity Speech Reconstruction",authors:"R. Buragohain, S. Maheshwari, K. Nathwani",venue:"Interspeech 2026",year:2026,type:"Conference",category:"EEG and Speech",doi:"https://doi.org/10.21437/Interspeech.2026-377",abstract:"",keywords:["EEG","Speech Reconstruction","WaveNet"],pdf:"",scholar:""}
];
const PUB_FILTERS = ["All Publications","Journal Articles","Conference Papers","Biomedical AI","EEG and Speech","Computer Vision"];
const TIMELINE = [ // dates are placeholders: edit
 {kind:"Education",org:"C-DAC Mohali",role:"M.Tech, Computer Science and Engineering (AI)",date:"[Dates: edit]",desc:"",skills:[]},
 {kind:"Education",org:"GLA University, Mathura",role:"B.Tech, Computer Science and Engineering (AI & ML)",date:"[Dates: edit]",desc:"",skills:[]},
 {kind:"Research",org:"IIT Jammu",role:"Research Intern — RISE-UP Fellowship",date:"[Dates: edit]",desc:"[Add research description]",skills:[]},
 {kind:"Industry",org:"Feynn Labs",role:"Machine Learning Intern",date:"[Dates: edit]",desc:"[Add description]",skills:[]}
];
const SKILLS = {
 "Programming":["Python","Java","JavaScript","HTML","CSS"],
 "AI & Machine Learning":["Deep Learning","CNN","LSTM","Transformers","Machine Learning","Computer Vision","NLP"],
 "Biomedical AI":["EEG Signal Processing","Brain-Computer Interfaces","Biomedical Signal Analysis","Neural Speech Reconstruction","Medical Image Analysis"],
 "Tools & Frameworks":["TensorFlow","Keras","PyTorch","Scikit-learn","OpenCV","NumPy","Pandas","Matplotlib"]
};
const BLOG = [ // sample placeholders: replace with real posts
 {date:"[Date]",cat:"Research Update",title:"Sample post: add your research update",excerpt:"Editable placeholder. Replace with a real announcement.",url:"#"},
 {date:"[Date]",cat:"Technical Article",title:"Sample post: add a technical article",excerpt:"Editable placeholder for a technical write-up.",url:"#"},
 {date:"[Date]",cat:"Dataset Notes",title:"Sample post: add dataset notes",excerpt:"Editable placeholder for dataset notes.",url:"#"}
];
export {SITE,SOCIALS,STATS,INTERESTS,PROJECTS,PUBLICATIONS,PUB_FILTERS,TIMELINE,SKILLS,BLOG};
