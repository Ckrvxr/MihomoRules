# MihomoRules


MihomoRules is a personal rule library designed for [Mihomo](https://github.com/MetaCubeX/mihomo) (Clash Meta), providing AD-Blocking, Privacy Protection, and AntiAntiFraud features.

## ✨ Features

- 🛡️ **Anti-Fraud Protection** - Strongly blocks anti-fraud programs on mobile phones, including automatic uploading of app lists
- 🚫 **Ad Blocking** - Blocks ads and telemetry data
- 🔒 **Privacy Protection** - Protects user privacy and prevents data leakage
- ⚡ **P2P Optimization** - Blocks P2P CDN to accelerate streaming access
- 🎮 **Gaming Optimization** - Provides direct connections for games that support China access to save bandwidth
- 🔧 **Proxy Tool Optimization** - Prevents proxy tools and P2P download software from using the proxy

## 📋 Rule Description

| Rule Name | Description |
|-----------|-------------|
| **DirectProcess** | Prevents proxy tools and P2P download software from using the proxy |
| **AntiAntiFraud** | Strongly blocks anti-fraud programs on mobile phones, including automatic uploading of app lists |
| **AntiPCDN** | Blocks P2P CDN to accelerate streaming access |
| **217heidai/adblockfilters** | Blocks ads and telemetry |
| **AWAvenue** | Blocks ads and telemetry for mobile phone |
| **category-games@cn** | Allows games that support China access to use direct connections to save bandwidth |

## 🚀 Quick Start

### Solution 1: Sparkle Configuration

```url
https://github.com/Ckrvxr/MihomoRules/raw/main/Source/Override/Sparkle.yaml
```

**Steps:**

1. Download the configuration file
2. Open the Sparkle panel
3. Go to the **"Override Configuration"** interface and upload the file
4. Enable the **"Global Application"** switch of script
5. Save

### Solution 2: FlClash Configuration

```url
https://github.com/Ckrvxr/MihomoRules/raw/main/Source/Override/FlClash.js
```

**Steps:**

1. Open the FlClash panel
2. Switch to **"Tools"** page
3. Click **"Advanced configuration"** option
4. Click **"Script"** option
5. Add the script provided by this project
6. Switch to **"Profiles"** page
7. Click **"..."** button
8. Click **"More"** option
9. Click **"Override"** option
10. Switch Override mode to **"Script"** and select our script, then save
11. Resync our subscriptions

## 📦 Rules

This project also generates some rule sets in the release branch for mihomo routing.

### Available Rule Sets

(Available rule sets are in the [Release](https://github.com/Ckrvxr/MihomoRules/tree/release) branch)

### Integration Example

```yaml
rule-providers:
  stevenblack:
    type: http
    behavior: classical
    format: yaml
    interval: 43200
    url: "hhttps://fastly.jsdelivr.net/gh/Ckrvxr/MihomoRules@RELEASE/StevenBlack.yaml"

rules:
  - ...
  - RULE-SET,stevenblack,REJECT
  - ...
```

## 🛠️ Project Structure

```
MihomoRules/
├── Source/
│   ├── Addition/          # Additional rule files
│   │   ├── AntiAntiFraud.yaml
│   │   ├── AntiPCDN.yaml
│   │   ├── AntiPCDNFix.yaml
│   │   └── DirectProcess.yaml
│   ├── Override/          # Override configuration files
│   │   ├── FlClash.js
│   │   └── Sparkle.yaml
│   └── Script/            # Conversion scripts
│       ├── DomainsToYAML.py
│       ├── HostsToYAML.py
│       ├── TextToYAML.py
│       └── YAMLCombineIP.py
├── LICENSE
└── README.md
```

## 🤝 Special Thanks

Special thanks to the following open source projects:

- [MetaCubeX/mihomo](https://github.com/MetaCubeX/mihomo) - Powerful proxy core
- [chen08209/FlClash](https://github.com/chen08209/FlClash) - Clash meta client
- [zsokami/ACL4SSR](https://github.com/zsokami/ACL4SSR) - SSR/Clash rules (be inspired)
- [StevenBlack/hosts](https://github.com/StevenBlack/hosts) - Ad-blocking hosts
- [217heidai/adblockfilters](https://github.com/217heidai/adblockfilters) - Ad-blocking rules
- [TG-Twilight/AWAvenue-Ads-Rule](https://github.com/TG-Twilight/AWAvenue-Ads-Rule) - Ad-blocking rules

## 📄 License

This project follows the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) license. Using the rules implies agreement with the licensing terms.

---
