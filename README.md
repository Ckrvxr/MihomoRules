# MihomoRules

MihomoRules is a personal rule library designed for [Mihomo](https://github.com/MetaCubeX/mihomo)(Clash Meta), providing AD-Blocking, Privacy Protection, and AntiAntiFraud features.

These override scripts all uniformly have the following rules:

| Rule Name         | Description |
| ----------------- | ----------- |
| DirectProcess     | Prevents proxy tools and P2P download software from using the proxy. |
| AntiAntiFraud     | Strongly blocks anti-fraud programs on mobile phones, including automatic uploading of app lists. This is a set of rules collected and organized by this project. |
| AntiPCDN          | Blocks P2P CDN to speed up streaming access. This is a set of rules collected by this project. |
| AdRules           | Blocks ads and telemetry. |
| AWAvenue          | Blocks ads and telemetry for mobile phone. |
| category-games@cn | Allows games that support china access to use direct connections to save bandwidth. |

## 🎛️ Override Rule Configuration Guide

There are two solutions to override the configuration here, choose one according to the sorftware.

### Solution 1: Sparkle

```yaml
▸ Configuration File: Sparkle.yaml
▸ Download Link: https://github.com/Ckrvxr/MihomoRules/raw/main/Source/Override/Sparkle.yaml
```

**Steps:**

1. Download the configuration file.
2. Open the Sparkle panle.
3. Go to the **"Override Configuration"** interface and upload the file.
4. Enable the **"Global Application"** switch of script.
5. Save.

### Solution 2: FlClash

```yaml
▸ Configuration File: FlClash.js
▸ Download Link: https://github.com/Ckrvxr/MihomoRules/raw/main/Source/Override/FlClash.js
```

**Steps:**

1. Open the FlClash Dash panle.
2. Switch to **"Tools"** page.
3. Click **"Advanced configuration"** option.
4. Click **"Script"** option.
5. Add the scipt provide by this project.
6. Switch to **"Profiles"** page.
7. Click **"..."** Buttom.
8. Click **"More"** Option.
9. Click **"Overide"** Option.
10. Switch Overide mode to **"Script"** and select our script, then save.
11. Resync our Subs.


## 🚀 Rules

This project will also generate the following rules in release branch for mihomo routing.

### 📦 Available Rule Sets

(Available rule sets are in the [Release](https://github.com/Ckrvxr/MihomoRules/tree/release) branch)

### 🛠️ Integration Example

```yaml
rule-providers:
  stevenblack:
    type: http
    behavior: classical
    format: yaml
    interval: 43200
    url: "https://cdn.jsdelivr.net/gh/Ckrvxr/MihomoRules@RELEASE/StevenBlack.yaml"

rules:
  -...
  - RULE-SET,stevenblack,REJECT
  -...
```

---

> 📌 This project follows the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) license. Using the rules implies agreement with the licensing terms.

---

# Special Thanks to the Following Projects

- https://github.com/MetaCubeX/mihomo
- https://github.com/StevenBlack/hosts
- https://github.com/tindy2013/subconverter
- https://github.com/zsokami/ACL4SSR
- https://github.com/LoopDns/Fuck-you-MIUI/
- https://github.com/Cats-Team/AdRules
- https://github.com/TG-Twilight/AWAvenue-Ads-Rule
- https://github.com/chen08209/FlClash
