/* ========= EDIT YOUR CONTENT HERE =========
   Every fact below comes from Saket_Maheshwari_Resume_IISC_4.pdf.
   Items marked [kept] were already on the earlier version of the site and are not in the resume. */
const SITE = { email: "saketmaheshwariml@gmail.com", location: "Kasganj, Uttar Pradesh, India" };
const SOCIALS = [
  {name:"LinkedIn",icon:"bi-linkedin",url:"https://www.linkedin.com/in/saketmaheshwarii"},
  {name:"Email",icon:"bi-envelope",url:"mailto:"+SITE.email}
  // Add GitHub / Google Scholar / ORCID here once you have the real URLs:
  // {name:"GitHub",icon:"bi-github",url:"https://github.com/<you>"},
];
const STATS = [ // value, suffix
  {label:"Publications",value:10,suffix:""},
  {label:"Research Positions",value:3,suffix:""},
  {label:"Paper Submissions Co-authored",value:5,suffix:"+"},
  {label:"EEG Classification Accuracy",value:92,suffix:"%"}
];
const INTERESTS = [
 ["EEG-based Brain-Computer Interfaces","Neural decoding from EEG for communication and control."],
 ["Neural Decoding","Mapping brain activity to meaningful outputs such as speech."],
 ["Time-Frequency & Wavelet Analysis","Biomedical signal processing with time-frequency and wavelet representations."],
 ["Speech & Audio Intelligibility","Self-supervised and deep learning methods for predicting intelligibility."],
 ["EEG-to-Speech Reconstruction","Neural vocoder frameworks that turn EEG into speech."],
 ["Neurological & Physiological Signals","Machine learning for analysing signals from the brain and body."],
 ["Low-Resource, Clinically Relevant AI","Methods designed for settings with limited data and real clinical need."],
 ["Medical Image Analysis","CNN-based identification of disease in medical imaging."],
 ["Predictive Maintenance & Applied ML","Data-driven forecasting and failure prediction for real systems."]
];

const PROJECTS = [ // github: "" hides the GitHub button. metrics/points show in the details dialog.
 {title:"EEG-to-Speech Reconstruction",cat:"EEG",tags:["EEG","Gamma Band","WaveNet","Speech Reconstruction"],tech:["Time-frequency features","WaveNet decoder"],github:"",img:"",
  where:"IIT Jammu · Interspeech 2026",
  desc:"Reconstructs speech from EEG using gamma-band time-frequency features fed to a WaveNet decoder, aiming for high-fidelity output. The work is accepted at Interspeech 2026, a top-tier venue in speech and language processing.",
  points:["Gamma-band time-frequency features from EEG","WaveNet decoder framework for speech reconstruction","Accepted: Proc. Interspeech 2026, pp. 4796–4800"]},
 {title:"Self-Supervised Speech Intelligibility Prediction",cat:"Speech",tags:["Speech AI","Whisper","BiLSTM","Self-Supervised"],tech:["Whisper encoder","BiLSTM"],github:"",img:"",
  where:"IIT Jammu",
  desc:"A speech intelligibility prediction system built on Whisper encoder embeddings and a BiLSTM, trained on a large-scale FLAC dataset without manual annotations.",
  metrics:[["0.052","RMSE"],["0.89","Pearson correlation"]],
  points:["Whisper encoder embeddings as input representation","BiLSTM for temporal modelling","No manual annotations needed"]},
 {title:"EEG Preprocessing Pipelines",cat:"EEG",tags:["EEG","Wavelets","Spectral Filtering","Biomedical Signals"],tech:["MNE-Python","PyWavelets"],github:"",img:"",
  where:"IIT Jammu",
  desc:"End-to-end EEG signal preprocessing pipelines using wavelet transforms and spectral filtering, reaching 92% classification accuracy on biomedical benchmarks.",
  metrics:[["92%","Classification accuracy"]],
  points:["Wavelet transforms and spectral filtering","Evaluated on biomedical benchmarks"]},
 {title:"Airbus A320 Predictive Maintenance",cat:"Predictive Maintenance",tags:["Predictive Maintenance","Aviation","Data-Driven"],tech:["Machine Learning"],github:"",img:"",
  where:"ICETCI 2025",
  desc:"A data-driven approach to reducing aircraft downtime with predictive maintenance for the Airbus A320, published at ICETCI 2025 (Hyderabad).",
  points:["Published: ICETCI 2025, pp. 1–9","DOI 10.1109/ICETCI67340.2025.11257885"]},
 {title:"Predictive Maintenance & Thermal Energy Forecasting",cat:"Predictive Maintenance",tags:["Forecasting","Predictive Maintenance","Time Series"],tech:["Random Forest","LSTM","SARIMA"],github:"",img:"",
  where:"Feynn Labs · IC2E3 2025",
  desc:"Predictive maintenance and thermal energy forecasting models built with Random Forest, LSTM and SARIMA during an ML internship at Feynn Labs. The forecasting work was published at IC2E3 2025 as a multimodal Random Forest + SARIMA approach.",
  metrics:[["87%","Failure prediction accuracy"],["23%","Lower forecasting error vs. baselines"]],
  points:["Random Forest, LSTM and SARIMA models","Compared against traditional baselines"]},
 {title:"Aircraft Fuselage Hole Detection with YOLO",cat:"Computer Vision",tags:["Computer Vision","YOLO","Inspection","Benchmarking"],tech:["YOLO frameworks"],github:"",img:"",
  where:"INDISCON 2026 · Accepted",
  desc:"A benchmark of YOLO frameworks for automated detection of holes in aircraft fuselage, accepted at INDISCON 2026.",
  points:["Benchmarking study of YOLO frameworks","Accepted at INDISCON 2026"]},
 {title:"Building Energy Optimisation with Computer Vision",cat:"Computer Vision",tags:["Computer Vision","AutoCAD","Energy"],tech:["Computer Vision","AutoCAD"],github:"",img:"",
  where:"NIT Jalandhar",
  desc:"A computer vision framework integrated with AutoCAD to predict and optimise building energy consumption.",
  metrics:[["18%","Lower prediction error"]],points:["Integrated with AutoCAD drawings"]},
 {title:"Transfer Learning for Image Classification",cat:"Computer Vision",tags:["Transfer Learning","ResNet","VGG"],tech:["ResNet","VGG"],github:"",img:"",
  where:"NIT Jalandhar",
  desc:"Transfer learning pipelines using ResNet and VGG for image classification, published in IEEE conference proceedings.",
  metrics:[["15%","Accuracy gain over baseline"]],points:["ResNet and VGG backbones","Published in IEEE conference proceedings"]},
 {title:"DeepNeuroScan — Brain Tumor Identification",cat:"Medical AI",tags:["Medical Imaging","CNN","Brain Tumor"],tech:["CNN"],github:"",img:"",
  where:"IC2E3 2025",
  desc:"An advanced CNN architecture for precise brain tumor identification in medical imaging, published at IC2E3 2025 (Srinagar Garhwal).",
  points:["Published: IC2E3 2025, pp. 1–6","DOI 10.1109/IC2E365635.2025.11167740"]},
 {title:"Improved Diabetes Prediction Through Multimodeling",cat:"Medical AI",tags:["Diabetes","Ensemble Learning","Clinical ML"],tech:["Multiple ML models"],github:"",img:"",
  where:"ICETI4T 2025",
  desc:"Merges diverse machine learning models to improve diabetes prediction performance, published at ICETI4T 2025 (Navi Mumbai).",
  points:["Single-author paper","DOI 10.1109/ICETI4T63625.2025.11132156"]},
 {title:"HybridTrust — Misinformation Detection",cat:"Applied ML",tags:["NLP","Transformers","Social Networks"],tech:["LP-GRU","Transformer"],github:"",img:"",
  where:"AECTSD 2025",
  desc:"Fuses LP-GRU and Transformer architectures for enhanced misinformation detection in social networks, published at AECTSD 2025 (Coimbatore).",
  points:["Published: AECTSD 2025","DOI 10.1109/AECTSD65988.2025.11411161"]},
 {title:"Unlocking Dev Nagri — OCR with CNN",cat:"Computer Vision",tags:["OCR","CNN","Devanagari"],tech:["CNN"],github:"",img:"",
  where:"Book chapter · SCRS 2024",
  desc:"OCR for Devanagari script using convolutional neural networks, published as a chapter in Applied Intelligence and Computing (SCRS, India, 2024).",
  points:["pp. 157–167","DOI 10.56155/978-81-955020-9-7-17"]},
 /* [kept] from the earlier site version, not in the resume: confirm these are yours or delete them */
 {title:"WHG-Mamba — 3T to 7T MRI Enhancement",cat:"Medical AI",tags:["Medical Image Analysis","Mamba","Deep Learning","MRI Enhancement"],tech:["Wavelets","Hypergraph Conv","Mamba"],github:"",img:"",where:"",desc:"A deep learning framework for enhancing 3T T2-weighted brain MRI toward 7T-quality imaging using paired 3T T1-weighted and T2-weighted inputs. The architecture integrates wavelet-based features, hypergraph convolution, feature modulation, and Mamba-based modeling.",points:[]},
 {title:"HYFuse-SER — Hyperbolic EEG Fusion",cat:"EEG",tags:["EEG","Multimodal Fusion","Hyperbolic Learning","Emotion Recognition"],tech:["Raw EEG","Mel-spectrogram","PSD"],github:"",img:"",where:"",desc:"A multimodal EEG emotion recognition framework integrating raw EEG signals, Mel-spectrogram representations, and power spectral density features using hyperbolic fusion.",points:[]},
 {title:"Motor Imagery EEG Classification",cat:"EEG",tags:["BCI","EEG","Motor Imagery","Deep Learning"],tech:["Cross-subject evaluation"],github:"",img:"",where:"",desc:"An EEG-based brain-computer interface framework for classifying motor imagery tasks using deep learning and cross-subject evaluation.",points:[]},
 {title:"GastroPathNet",cat:"Medical AI",tags:["Medical AI","Computer Vision","Attention Mechanisms","Cancer Classification"],tech:["Multi-scale attention"],github:"",img:"",where:"",desc:"A multi-scale attention-based deep learning framework for gastric cancer classification using medical image analysis.",points:[]}
];

const PUBLICATIONS = [ // empty fields are hidden automatically
 {title:"Exploiting EEG-based Gamma-Band Time Frequency Feature in WaveNet Decoder Framework for High-Fidelity Speech Reconstruction",authors:"R. Buragohain, S. Maheshwari, K. Nathwani",venue:"Proc. Interspeech 2026, pp. 4796–4800",year:2026,type:"Conference",category:"EEG and Speech",doi:"https://doi.org/10.21437/Interspeech.2026-377",keywords:["EEG","Speech Reconstruction","WaveNet"]},
 {title:"Exploring Benchmarking YOLO Frameworks for Automated Aircraft Fuselage Hole Detection",authors:"S. Maheshwari, R. Buragohain, H. Rajoria",venue:"INDISCON 2026",year:2026,status:"Accepted",type:"Conference",category:"Computer Vision",doi:"",keywords:["YOLO","Aircraft Inspection"]},
 {title:"HybridTrust: Fusing LP-GRU and Transformer Architectures for Enhanced Misinformation Detection in Social Networks",authors:"S. Maheshwari, R. Chatterjee, S. Sinha",venue:"AECTSD 2025, Coimbatore, India, pp. 1–6",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/AECTSD65988.2025.11411161",keywords:["Misinformation","Transformer"]},
 {title:"DeepNeuroScan: Advanced CNN Architecture for Precise Brain Tumor Identification in Medical Imaging",authors:"S. Maheshwari, R. Chatterjee, M. Agrawal",venue:"IC2E3 2025, Srinagar Garhwal, India, pp. 1–6",year:2025,type:"Conference",category:"Biomedical AI",doi:"https://doi.org/10.1109/IC2E365635.2025.11167740",keywords:["CNN","Brain Tumor","Medical Imaging"]},
 {title:"Reducing Aircraft Downtime with Predictive Maintenance: A Data-Driven Approach for Airbus A320",authors:"S. Maheshwari, S. Sinha, R. Chatterjee",venue:"ICETCI 2025, Hyderabad, India, pp. 1–9",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/ICETCI67340.2025.11257885",keywords:["Predictive Maintenance","Airbus A320"]},
 {title:"Forecasting Thermal Energy Demand: A Multimodal Approach Using Random Forest and SARIMA Models",authors:"S. Maheshwari, M. Agrawal, S. Sinha",venue:"IC2E3 2025, Srinagar Garhwal, India, pp. 1–5",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/IC2E365635.2025.11167471",keywords:["Forecasting","Random Forest","SARIMA"]},
 {title:"Improved Diabetes Prediction Through Multimodeling: Merging Diverse Machine Learning Models for Superior Performance",authors:"S. Maheshwari",venue:"ICETI4T 2025, Navi Mumbai, India, pp. 1–7",year:2025,type:"Conference",category:"Biomedical AI",doi:"https://doi.org/10.1109/ICETI4T63625.2025.11132156",keywords:["Diabetes","Ensemble Learning"]},
 {title:"Enhancing Network Security through Real-Time Anomaly Detection in Network Traffic",authors:"P. K. Jha, S. Maheshwari, R. Kumar, B. Kumar",venue:"ICoICC 2025, Bhubaneswar, India, pp. 1–6",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/ICoICC64033.2025.11051998",keywords:["Anomaly Detection","Network Security"]},
 {title:"Predicting Telecom Customer Churn with Combined Machine Learning Models",authors:"S. Sinha, S. Maheshwari, P. Sharma, S. Sharma",venue:"ETCOM 2025, Mangalore, India, pp. 1–7",year:2025,type:"Conference",category:"Applied ML",doi:"https://doi.org/10.1109/ETCOM66606.2025.11437063",keywords:["Churn","Ensemble Learning"]},
 {title:"Unlocking Dev Nagri: OCR with CNN",authors:"S. Maheshwari, S. Sinha, S. Upadhyay",venue:"Applied Intelligence and Computing, SCRS, India, pp. 157–167",year:2024,type:"Book Chapter",category:"Computer Vision",doi:"https://doi.org/10.56155/978-81-955020-9-7-17",keywords:["OCR","CNN","Devanagari"]}
];
const PUB_FILTERS = ["All Publications","Conference Papers","Book Chapter","EEG and Speech","Biomedical AI","Computer Vision","Applied ML"];

const TIMELINE = [
 {kind:"Research",org:"Indian Institute of Technology Jammu",role:"Research Intern — Signal Processing & Speech AI",date:"Nov 2025 – Present",place:"Jammu & Kashmir, India · Advisor: Prof. Karan Nathwani",
  bullets:["Investigated EEG-to-speech reconstruction using gamma-band time-frequency features with a WaveNet decoder; work accepted at Interspeech 2026, a top-tier venue in speech and language processing.",
  "Designed a self-supervised speech intelligibility prediction system using Whisper encoder embeddings and BiLSTM; achieved RMSE 0.052 and Pearson correlation 0.89 on a large-scale FLAC dataset without manual annotations.",
  "Built end-to-end EEG signal preprocessing pipelines using wavelet transforms and spectral filtering, achieving 92% classification accuracy on biomedical benchmarks.",
  "Co-authored and contributed to 5+ paper submissions in EEG signal processing, speech reconstruction, and audio intelligibility prediction."],
  skills:["EEG","Wavelets","Whisper","BiLSTM","WaveNet"]},
 {kind:"Education",org:"Centre for Development of Advanced Computing (C-DAC), Mohali",role:"M.Tech in Artificial Intelligence",date:"2026 – Present",place:"India",bullets:[],skills:[]},
 {kind:"Research",org:"National Institute of Technology Jalandhar",role:"Machine Learning Researcher",date:"Jun 2025 – Sep 2025",place:"Punjab, India",
  bullets:["Developed transfer learning pipelines using ResNet and VGG for image classification, improving accuracy by 15% over baseline; published in IEEE conference proceedings.",
  "Designed a computer vision framework integrated with AutoCAD to predict and optimise building energy consumption, reducing prediction error by 18%."],
  skills:["ResNet","VGG","Computer Vision","AutoCAD"]},
 {kind:"Industry",org:"Feynn Labs",role:"Machine Learning Intern",date:"Jan 2024 – Mar 2024",place:"Guwahati, Assam, India",
  bullets:["Developed predictive maintenance and thermal energy forecasting models (Random Forest, LSTM, SARIMA) achieving 87% failure prediction accuracy and 23% lower forecasting error vs. traditional baselines."],
  skills:["Random Forest","LSTM","SARIMA"]},
 {kind:"Education",org:"GLA University",role:"Bachelor of Technology in Computer Science (AI & Machine Learning)",date:"Nov 2022 – May 2026",place:"Mathura, Uttar Pradesh",bullets:[],skills:[]},
 {kind:"Education",org:"Mount Litera Zee School",role:"Class 12 — Computer Programming",date:"2019",place:"",bullets:[],skills:[]}
];

const SKILLS = {
 "Languages & Tools":["Python","LaTeX"],
 "ML / DL Frameworks":["TensorFlow","PyTorch","Keras","scikit-learn","HuggingFace Transformers"],
 "Signal Processing & Audio":["MNE-Python","librosa","PyWavelets","OpenCV","Whisper"],
 "Data & Visualization":["NumPy","Pandas","Matplotlib","Seaborn","Jupyter Notebook"]
};

/* ---------- Signals Lab ---------- */
const SIGNALS = {
 pipeline:[
  {t:"Raw EEG",d:"Scalp EEG is weak, non-stationary and mixed with noise, so it can't be decoded as-is. Every pipeline starts by treating the raw recording with care.",tools:["MNE-Python"]},
  {t:"Spectral Filtering",d:"Spectral filtering keeps the frequency range of interest and removes out-of-band noise before any feature is computed.",tools:["MNE-Python","Spectral filtering"]},
  {t:"Wavelet Transform",d:"Wavelet transforms give a time-frequency representation, showing which frequencies are active and exactly when. In my pipelines, wavelets plus spectral filtering reached 92% classification accuracy on biomedical benchmarks.",tools:["PyWavelets","Wavelet transforms"]},
  {t:"Gamma-Band Features",d:"The high-frequency gamma band is isolated in the time-frequency plane and used as the feature set for speech reconstruction. This is the core idea of my Interspeech 2026 paper.",tools:["Gamma-band TF features"]},
  {t:"WaveNet Decoder",d:"A WaveNet decoder, a neural vocoder, turns the EEG features into a speech waveform, aiming for high-fidelity reconstruction.",tools:["WaveNet","Neural vocoder"]},
  {t:"Reconstructed Speech",d:"The output is speech reconstructed from brain activity. The work is accepted at Interspeech 2026 (pp. 4796–4800).",tools:["Interspeech 2026"]}
 ],
 intel:[
  {t:"Speech audio",s:"Large-scale FLAC dataset"},
  {t:"Whisper encoder",s:"Embeddings"},
  {t:"BiLSTM",s:"Temporal modelling"},
  {t:"Intelligibility score",s:"No manual annotations"}
 ]
};

/* ---------- Predictive Maintenance ---------- */
const MAINT = {
 flow:[
  ["Sensor & operational data","What the system records"],
  ["Cleaning & features","Turn raw logs into signals a model can use"],
  ["Models","Random Forest · LSTM · SARIMA"],
  ["Failure prediction","Or demand forecast"],
  ["Maintenance planning","Schedule before it fails"],
  ["Less downtime","The goal"]
 ],
 pubs:["Reducing Aircraft Downtime","Forecasting Thermal Energy Demand","Exploring Benchmarking YOLO"] // matched against PUBLICATIONS titles
};

/* ---------- Biomedical AI ---------- */
const BIO = [
 {k:"eeg",icon:"🧠",title:"EEG & Neural Decoding",blurb:"Decoding brain activity with time-frequency and wavelet representations.",
  items:[
   {t:"EEG-to-speech reconstruction",s:"Gamma-band time-frequency features with a WaveNet decoder",m:"Interspeech 2026"},
   {t:"EEG preprocessing pipelines",s:"Wavelet transforms and spectral filtering",m:"92% classification accuracy"}]},
 {k:"img",icon:"🔬",title:"Medical Imaging",blurb:"Deep learning that helps identify disease in medical images.",
  items:[{t:"DeepNeuroScan",s:"Advanced CNN architecture for precise brain tumor identification",m:"IC2E3 2025"}]},
 {k:"clin",icon:"🩺",title:"Clinical Prediction",blurb:"Combining models for more reliable predictions on health data.",
  items:[{t:"Diabetes prediction through multimodeling",s:"Merging diverse machine learning models for superior performance",m:"ICETI4T 2025"}]},
 {k:"aud",icon:"🎧",title:"Speech & Audio",blurb:"Learned representations for understanding how intelligible speech is.",
  items:[{t:"Self-supervised intelligibility prediction",s:"Whisper encoder embeddings with a BiLSTM, no manual annotations",m:"RMSE 0.052 · Pearson 0.89"}]}
];

/* ---------- Blog: first-person posts. Block types: string = paragraph, ["h",text], ["ul",[items]], ["q",text] ---------- */
const BLOG = [
 {slug:"eeg-to-speech",cat:"Research Update",title:"Turning brain waves into speech: my Interspeech 2026 paper",
  excerpt:"A plain-language tour of EEG-to-speech reconstruction with gamma-band time-frequency features and a WaveNet decoder.",
  body:[
   "Our paper, “Exploiting EEG-based Gamma-Band Time Frequency Feature in WaveNet Decoder Framework for High-Fidelity Speech Reconstruction”, has been accepted at Interspeech 2026. I wrote it with R. Buragohain and my advisor, Prof. Karan Nathwani, during my research internship at IIT Jammu. This post explains the idea in plain language.",
   ["h","The problem"],
   "Brain-computer interfaces that turn neural activity into speech could one day give a voice back to people who can't speak. EEG is attractive because it is non-invasive, but it is also noisy, low in amplitude and changes constantly over time. Reconstructing something as rich as a speech waveform from it is hard.",
   ["h","Why time-frequency features?"],
   "EEG is non-stationary: the frequencies present change from moment to moment. A plain Fourier spectrum tells you which frequencies exist but not when. Time-frequency representations keep both, which is why wavelet and time-frequency methods are central to my research interests.",
   ["h","Why the gamma band?"],
   "Gamma is the high-frequency part of the EEG spectrum, and it is often linked to fast, local neural processing. The paper exploits gamma-band time-frequency features as the input to the decoder.",
   ["h","Why a WaveNet decoder?"],
   "A neural vocoder like WaveNet generates audio sample by sample and is known for natural-sounding output. Using it as the decoder makes high-fidelity reconstruction the goal, rather than only predicting coarse speech features.",
   ["ul",["Input: gamma-band time-frequency features from EEG","Decoder: a WaveNet framework","Goal: high-fidelity speech reconstruction"]],
   "I'll leave the detailed experiments and numbers to the paper itself (Proc. Interspeech 2026, pp. 4796–4800, doi:10.21437/Interspeech.2026-377). If you work on EEG, speech or BCIs and want to compare notes, my contact details are at the bottom of this page."
  ]},
 {slug:"speech-intelligibility",cat:"Technical Article",title:"Predicting speech intelligibility without manual annotations",
  excerpt:"How Whisper encoder embeddings and a BiLSTM can estimate intelligibility at scale, reaching RMSE 0.052 and Pearson 0.89.",
  body:[
   "Judging how intelligible a piece of speech is normally needs human listeners, which is slow and expensive. At IIT Jammu I worked on a system that predicts intelligibility automatically, without manual annotations.",
   ["h","The approach"],
   "The system takes speech audio, encodes it with a Whisper encoder, and passes the resulting embeddings through a BiLSTM that models how intelligibility evolves over time. The final output is an intelligibility score.",
   ["ul",["Data: a large-scale FLAC audio dataset","Representation: Whisper encoder embeddings","Model: BiLSTM","Labels: no manual annotations required"]],
   ["h","Results"],
   "The system reached an RMSE of 0.052 and a Pearson correlation of 0.89. RMSE tells you how far predictions are from the target on average (lower is better), and Pearson correlation tells you how well the predictions follow the same trend as the target (closer to 1 is better).",
   ["h","Why it matters to me"],
   "Intelligibility is where speech technology meets human experience. It is also directly related to my EEG work: both are about understanding speech-related information that is hard to measure directly, in settings where labelled data is scarce."
  ]},
 {slug:"wavelets-eeg",cat:"Technical Article",title:"Wavelets and spectral filtering: how I think about EEG preprocessing",
  excerpt:"Why preprocessing decides what a model can learn, and how wavelet transforms and spectral filtering fit together.",
  body:[
   "Most of the EEG models I have worked on are only as good as their preprocessing. At IIT Jammu I built end-to-end EEG preprocessing pipelines using wavelet transforms and spectral filtering, reaching 92% classification accuracy on biomedical benchmarks. Here is how I think about the two main ingredients.",
   ["h","Spectral filtering: decide what to keep"],
   "EEG contains slow drifts, line noise and muscle artefacts alongside the activity you care about. Spectral filtering keeps the frequency range you need and discards the rest. It is simple, but a wrong cutoff can remove the very signal you are trying to decode.",
   ["h","Wavelets: see frequency over time"],
   "A Fourier transform averages over the whole recording. A wavelet transform slides a short, oscillating window across the signal at many scales, so it tells you what frequencies are present and when. For a signal that keeps changing, that is the more useful picture.",
   ["q","Filtering decides which frequencies enter the pipeline. Wavelets decide how they are represented."],
   ["h","My toolkit"],
   ["ul",["MNE-Python for EEG handling and filtering","PyWavelets for wavelet transforms","NumPy, Pandas and Matplotlib for analysis and plots"]],
   "On this site's Signals Lab section, you can play with a synthetic signal, switch the frequency bands on and off and watch the wavelet scalogram respond. It is simulated data for illustration, not a real recording."
  ]},
 {slug:"predictive-maintenance",cat:"Applied ML",title:"Predictive maintenance: from Feynn Labs to the Airbus A320",
  excerpt:"What predictive maintenance is, and what my internship and my ICETCI 2025 paper taught me about it.",
  body:[
   "Before I worked on EEG, I spent time on predictive maintenance, which is about predicting when equipment will fail so it can be repaired before it does, instead of after.",
   ["h","At Feynn Labs"],
   "During my Machine Learning internship (Jan–Mar 2024) I developed predictive maintenance and thermal energy forecasting models with Random Forest, LSTM and SARIMA. They reached 87% failure prediction accuracy and 23% lower forecasting error than traditional baselines.",
   ["h","The ICETCI 2025 paper"],
   "That experience grew into “Reducing Aircraft Downtime with Predictive Maintenance: A Data-Driven Approach for Airbus A320”, co-authored with S. Sinha and R. Chatterjee and presented at ICETCI 2025 in Hyderabad. The motivation is simple: an aircraft on the ground is not earning, and unplanned downtime is expensive.",
   ["h","Three takeaways"],
   ["ul",["Different models suit different questions: tree-based models for failure classification, sequence models for temporal patterns, and SARIMA for seasonal forecasting.","Compare against a traditional baseline. A number only means something next to one.","Predictions are useful only if they become a maintenance schedule."]],
   "I also co-authored a benchmark of YOLO frameworks for automated aircraft fuselage hole detection, accepted at INDISCON 2026, which brings computer vision into the same inspection-and-maintenance story."
  ]},
 {slug:"research-journey",cat:"Reflection",title:"From Devanagari OCR to EEG: how my research grew",
  excerpt:"A short timeline of the problems I've worked on since my B.Tech and the thread that connects them.",
  body:[
   "Looking back at my publication list, the topics look scattered at first. Here is the path in order.",
   ["ul",[
    "2024: “Unlocking Dev Nagri: OCR with CNN”, a book chapter in Applied Intelligence and Computing. Then an ML internship at Feynn Labs on predictive maintenance and forecasting.",
    "2025: conference papers on diabetes prediction, thermal energy forecasting, brain tumor identification (DeepNeuroScan), network anomaly detection, telecom churn, misinformation detection (HybridTrust) and Airbus A320 predictive maintenance.",
    "Summer 2025: Machine Learning Researcher at NIT Jalandhar, working on transfer learning for image classification and a computer vision framework for building energy.",
    "Nov 2025 onward: Research Intern at IIT Jammu in signal processing and speech AI, under Prof. Karan Nathwani.",
    "2026: M.Tech in Artificial Intelligence at C-DAC Mohali, and EEG-to-speech work accepted at Interspeech 2026."]],
   ["h","The thread"],
   "The common thread is turning raw, messy data into something a person can act on: characters on a page, a failing component, a tumor on a scan, or a thought turned into speech. The last of these is where I want to stay: EEG-based brain-computer interfaces and neural decoding, built for low-resource and clinically relevant settings.",
   "Thank you to my co-authors, and to Prof. Karan Nathwani, my advisor at IIT Jammu."
  ]}
];

/* ---------- Mentors & Co-Authors: papers are matched from PUBLICATIONS by the author string in `match`.
   Photos: drop a file at public/assets/images/mentors/<slug>.jpg (initials show until then). ---------- */
const MENTORS = [
 {slug:"sayantan-sinha",name:"Dr. Sayantan Sinha",initials:"SS",role:"Mentor & Co-Author",affil:"Technical Trainer, Dept. of CEA, GLA University Mathura",match:"S. Sinha"},
 {slug:"rick-chatterjee",name:"Mr. Rick Chatterjee",initials:"RC",role:"Mentor & Co-Author",affil:"",match:"R. Chatterjee"}
];

/* Everyone who appears as a co-author on a publication above.
   slug  = photo file name: public/assets/images/coauthors/<slug>.jpg
   match = text that appears in the PUBLICATIONS "authors" string (used to count joint papers)
   Full names are only filled in where known; replace the initials-style names with full names when you like. */
const COAUTHORS = [
 {slug:"sayantan-sinha",name:"Dr. Sayantan Sinha",initials:"SS",role:"Mentor & Co-Author",affil:"Technical Trainer, Dept. of CEA, GLA University Mathura",match:"S. Sinha"},
 {slug:"rick-chatterjee",name:"Mr. Rick Chatterjee",initials:"RC",role:"Mentor & Co-Author",affil:"",match:"R. Chatterjee"},
 {slug:"punnet-sharma",name:"Punnet Sharma",initials:"PS",role:"Co-Author",affil:"",match:"P. Sharma"},
 {slug:"saksham-sharma",name:"Saksham Sharma",initials:"SS",role:"Co-Author",affil:"",match:"S. Sharma"},
 {slug:"h-rajoria",name:"Harsh  Rajoria",initials:"HR",role:"Co-Author",affil:"",match:"H. Rajoria"},
 {slug:"s-upadhyay",name:"Sachin Upadhyay",initials:"SU",role:"Co-Author",affil:"",match:"S. Upadhyay"},
 {slug:"pk-jha",name:"Prakash Kumar Jha",initials:"PJ",role:"Co-Author",affil:"",match:"P. K. Jha"},
 {slug:"r-kumar",name:"Rahul Kumar",initials:"RK",role:"Co-Author",affil:"",match:"R. Kumar"},
 {slug:"b-kumar",name:"B. Kumar",initials:"BK",role:"Co-Author",affil:"",match:"B. Kumar"}
];
export {COAUTHORS,MENTORS,SITE,SOCIALS,STATS,INTERESTS,PROJECTS,PUBLICATIONS,PUB_FILTERS,TIMELINE,SKILLS,SIGNALS,MAINT,BIO,BLOG};
