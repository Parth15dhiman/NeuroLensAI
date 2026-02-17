# 🧠 NeuroLens AI – Real‑Time Deepfake Detection System

Neurolens AI is a **real‑time deepfake detection system for live video calls** that identifies AI‑generated or manipulated faces to prevent fraud and impersonation. The system is designed as a **distributed, event‑driven, microservices‑based architecture**, combining modern backend engineering with state‑of‑the‑art deep learning models.

---

## 🚀 Key Highlights

* 🔍 **Real‑time deepfake detection** during live video calls
* ⚡ **Low‑latency, event‑driven processing** using Apache Kafka
* 🧠 **GPU‑accelerated AI inference engine** built with PyTorch
* 🧩 **Distributed microservices architecture** (Spring Boot + FastAPI)
* 🌐 **Live browser alerts** via WebSockets without interrupting the call
* 🔐 **Production‑grade security** using mTLS‑secured Kafka (Aiven)

---

## 🏗️ System Architecture (High Level)

```
[ Browser Extension ]
        │
        │ (Video Frames)
        ▼
[ Kafka Topic: video-frames ]
        │
        ▼
[ AI Inference Service (Python + PyTorch) ]
        │
        │ (Detection Result)
        ▼
[ Kafka Topic: detection-results ]
        │
        ▼
[ Spring Boot Backend ] ──► WebSocket (STOMP)
        │
        ▼
[ Real‑Time UI Overlay ]
```

---

## 🧠 AI / ML Pipeline

Neurolens AI uses a **dual‑stage deepfake detection pipeline**:

### 1️⃣ Face Extraction (Stage 1)

* Uses **MTCNN (Multi‑task Cascaded Convolutional Networks)**
* Robustly detects and crops faces from video frames
* Reduces noise and improves downstream classification accuracy

### 2️⃣ Deepfake Classification (Stage 2)

* Uses a **Hugging Face Image Classification model**
* Detects pixel‑level artifacts, texture inconsistencies, and GAN signatures
* Runs on **GPU when available** for real‑time inference

### 3️⃣ Temporal Smoothing

* Maintains a rolling window of prediction scores
* Reduces flickering and false positives
* Produces stable REAL / FAKE decisions

---

## ⚙️ Tech Stack

### Backend

* **Java 17**
* **Spring Boot**
* **Spring WebSocket (STOMP)**
* **Apache Kafka (Aiven, mTLS‑secured)**

### AI / ML

* **Python 3**
* **PyTorch**
* **Hugging Face Transformers**
* **MTCNN (facenet‑pytorch)**
* **OpenCV**

### Frontend / Client

* **Chrome Extension**
* **JavaScript, HTML, CSS**
* **WebSocket‑based UI overlay**

---

## 📁 Repository Structure

```
NeuroLensAI/
│
├── ai-model/
│   └── neuro_ai_engine.ipynb   # AI inference & Kafka consumer
│
├── backend/
│   ├── src/main/java/com/neurolensai/backend/
│   │   ├── controller/
│   │   ├── kafka/
│   │   ├── config/
│   │   └── BackendApplication.java
│   └── pom.xml
│
├── chrome-extension/
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
└── README.md
```

---

## 🔄 Data Flow (End‑to‑End)

1. Chrome extension captures video frames during a live call
2. Frames are sent to **Kafka (video-frames topic)**
3. Python AI service consumes frames and runs deepfake inference
4. Detection results are published to **Kafka (detection-results topic)**
5. Spring Boot backend consumes results
6. Backend pushes real‑time alerts via **WebSockets**
7. Browser overlay displays **REAL / FAKE** status instantly

---

## 🔐 Security Considerations

* No secrets are committed to the repository
* Kafka communication secured with **mTLS certificates**
* Hugging Face tokens and credentials loaded via environment variables
* Designed with **production‑grade secret hygiene**

---

## 🎯 Use Cases

* Preventing impersonation during video interviews
* Fraud detection in financial video KYC
* Deepfake detection in virtual meetings
* Security enhancement for live streaming platforms

---

## 🧪 Current Status

* ✅ End‑to‑end pipeline implemented
* ✅ Real‑time inference working
* ✅ Kafka‑based decoupled architecture
* 🚧 Future work: model service containerization & cloud deployment

---

## 🌱 Future Improvements

* Convert notebook‑based inference to a FastAPI service
* Dockerize all microservices
* Kubernetes‑based autoscaling
* Support multi‑face detection per frame
* Model ensemble for higher robustness

---

## 👤 Author

**Parth**
Backend & AI Engineer

---

## ⭐ Why This Project Matters

Neurolens AI demonstrates **strong backend engineering**, **real‑time distributed systems**, and **applied deep learning** working together in a production‑inspired architecture. It reflects real‑world system design choices used in security‑critical AI platforms.
