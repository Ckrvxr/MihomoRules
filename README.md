# MihomoRules

MihomoRules is a rule library designed for [Mihomo](https://github.com/MetaCubeX/mihomo)(Clash Meta), providing AD-Blocking, Privacy Protection, and AntiAntiFraud features.

## 🎛️ Override Rule Configuration Guide

Below is a table of the main functions included in the Mihomo override package:

| Function Name      | Description                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DirectProcess      | Prevents proxy tools and P2P download software from using the proxy.                                                                                                     |
| AntiAntiFraud      | Strongly blocks anti-fraud programs on mobile phones, including automatic uploading of app lists. This is a set of rules collected and organized by this project.        |
| Fuck-You-MIUI      | Strongly blocks MIUI telemetry.                                                                                                                                          |
| AdRules            | Blocks ads and telemetry.                                                                                                                                                |
| AWAvenue           | Blocks ads and telemetry.                                                                                                                                                |
| AntiPCDN           | Blocks P2P2 CDN to speed up streaming access. This is a set of rules collected by this project, which is not yet perfect. We hope everyone can contribute.               |
| category-games@cn  | Allows games that support china access to use direct connections to save bandwidth.                                                                                      |

### Option One: MihomoParty Direct Installation

```yaml
▸ Configuration File: MihomoParty.yaml
▸ Download Link: https://github.com/Ckrvxr/MihomoRules/raw/main/Source/Override/MihomoParty.yaml
```

**Steps**

1. Download the configuration file.
2. Open the MihomoParty panle.
3. Go to the "Override Configuration" interface and upload the file.
4. Enable the "Global Application" switch.
5. Save.

### Option Two: Subconverter Subscription Conversion

```bash
# Subscription conversion template URL (copy and replace YOURURL field)
https://api.sublink.dev/sub?config=https://github.com/Ckrvxr/MihomoRules/raw/refs/heads/main/Source/Override/Subconverter.yaml&target=clash&udp=true&add_emoji=true&url=YOURURL
```

**Parameter Description Table**

| Parameter | Required | Example Value                 | Function Description          |
| --------- | -------- | ----------------------------- | ----------------------------- |
| config    | ✔️       | http://....Subconverter.yaml  | Rule template address         |
| target    | ✔️       | clash                         | Output format                 |
| udp       |          | true                          | Enable UDP forwarding         |
| add_emoji |          | true                          | Add emoji flag                |
| url       | ✔️       | https://...com/subscribe/xxxx | Original subscription address |

---

## 🚀 Routing Rules

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
