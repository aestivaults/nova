import {
  AlertTriangle,
  ArrowRight,
  Award,
  Code,
  Cookie,
  CreditCard,
  Database,
  Eye,
  FileText,
  Gavel,
  Globe,
  Heart,
  HelpCircle,
  Layers,
  Lock,
  Palette,
  Scale,
  Shield,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { FAQCategory } from "../faq/page";
import { PolicySection } from "../cookies/page";
export const sections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Database,
    content: [
      {
        subtitle: "Wallet Information",
        details:
          "We collect your wallet address and transaction history when you connect your wallet to our platform. This information is necessary for displaying your NFTs and transaction history.",
      },
      {
        subtitle: "Account Information",
        details:
          "When you create a profile, we may collect your username, profile picture, bio, and social media links. This information is publicly displayed on your profile.",
      },
      {
        subtitle: "Usage Data",
        details:
          "We automatically collect information about how you use our platform, including pages visited, features used, and time spent on the platform. This helps us improve our services.",
      },
      {
        subtitle: "Device Information",
        details:
          "We collect information about your device, including IP address, browser type, operating system, and device identifiers for security and optimization purposes.",
      },
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: UserCheck,
    content: [
      {
        subtitle: "Service Provision",
        details:
          "We use your information to provide, maintain, and improve our NFT marketplace services, including facilitating transactions and displaying your digital assets.",
      },
      {
        subtitle: "Communication",
        details:
          "We may use your information to send you important updates about our services, security alerts, and promotional materials (if you've opted in).",
      },
      {
        subtitle: "Security & Fraud Prevention",
        details:
          "Your information helps us detect and prevent fraudulent activities, protect against security threats, and maintain the integrity of our platform.",
      },
      {
        subtitle: "Analytics & Improvement",
        details:
          "We analyze usage patterns to understand how users interact with our platform and make improvements to enhance user experience.",
      },
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Globe,
    content: [
      {
        subtitle: "Public Information",
        details:
          "Your wallet address, transaction history, and profile information are publicly visible on the blockchain and our platform. This is inherent to how NFTs and blockchain technology work.",
      },
      {
        subtitle: "Service Providers",
        details:
          "We may share information with trusted third-party service providers who help us operate our platform, such as cloud hosting providers and analytics services.",
      },
      {
        subtitle: "Legal Requirements",
        details:
          "We may disclose your information if required by law, court order, or government request, or to protect our rights and the safety of our users.",
      },
      {
        subtitle: "Business Transfers",
        details:
          "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner with proper notice to users.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Shield,
    content: [
      {
        subtitle: "Encryption",
        details:
          "All data transmission is encrypted using industry-standard SSL/TLS protocols. Sensitive data is encrypted at rest using AES-256 encryption.",
      },
      {
        subtitle: "Access Controls",
        details:
          "We implement strict access controls and regularly review who has access to user data. Our team members only have access to data necessary for their job functions.",
      },
      {
        subtitle: "Security Monitoring",
        details:
          "We continuously monitor our systems for security threats and vulnerabilities. Our security team conducts regular audits and penetration testing.",
      },
      {
        subtitle: "Incident Response",
        details:
          "We have established procedures for responding to security incidents and will notify affected users promptly in the event of a data breach.",
      },
    ],
  },
  {
    id: "user-rights",
    title: "Your Rights",
    icon: Eye,
    content: [
      {
        subtitle: "Access & Portability",
        details:
          "You have the right to access your personal data and request a copy of the information we hold about you in a portable format.",
      },
      {
        subtitle: "Correction",
        details:
          "You can update or correct your profile information at any time through your account settings. For other corrections, please contact our support team.",
      },
      {
        subtitle: "Deletion",
        details:
          "You may request deletion of your account and associated data. Note that some information may remain on the blockchain and cannot be deleted due to its immutable nature.",
      },
      {
        subtitle: "Opt-out",
        details:
          "You can opt out of promotional communications at any time. However, we may still send you important service-related communications.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Lock,
    content: [
      {
        subtitle: "Essential Cookies",
        details:
          "We use cookies that are necessary for the platform to function, including session management and security features.",
      },
      {
        subtitle: "Analytics Cookies",
        details:
          "We use analytics cookies to understand how users interact with our platform and identify areas for improvement.",
      },
      {
        subtitle: "Preference Cookies",
        details:
          "These cookies remember your preferences and settings to provide a personalized experience.",
      },
      {
        subtitle: "Cookie Management",
        details:
          "You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.",
      },
    ],
  },
];

export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    category: "Getting Started",
    icon: HelpCircle,
    color: "primary",
    faqs: [
      {
        id: "what-is-nft",
        question: "What is an NFT?",
        answer:
          "A Non-Fungible Token (NFT) is a unique digital certificate that proves ownership of a digital asset. Unlike cryptocurrencies, each NFT is unique and cannot be replicated, making it perfect for digital art, collectibles, and other unique digital items.",
      },
      {
        id: "create-account",
        question: "How do I create an account?",
        answer:
          "Creating an account is simple! Click the 'Connect Wallet' button in the top right corner, choose your preferred wallet (MetaMask, WalletConnect, etc.), and follow the prompts. Your wallet serves as your account - no separate registration needed.",
      },
      {
        id: "supported-wallets",
        question: "What wallets are supported?",
        answer:
          "We support all major Ethereum wallets including MetaMask, Coinbase Wallet, WalletConnect, and Ledger hardware wallets. We're constantly adding support for new wallets based on user demand.",
      },
      {
        id: "is-free",
        question: "Is AUREUSNOVA free to use?",
        answer:
          "Browsing and exploring AUREUSNOVA is completely free! We only charge fees when you buy, sell, or mint NFTs. Our marketplace fee is 2.5% per transaction, which is competitive with other major platforms.",
      },
    ],
  },
  {
    id: "buying-selling",
    category: "Buying & Selling",
    icon: ShoppingCart,
    color: "secondary",
    faqs: [
      {
        id: "how-buy-nft",
        question: "How do I buy an NFT?",
        answer:
          "To buy an NFT: 1) Connect your wallet, 2) Browse or search for NFTs, 3) Click 'Buy Now' or place a bid, 4) Confirm the transaction in your wallet. The NFT will appear in your collection once the transaction is confirmed.",
      },
      {
        id: "how-sell-nft",
        question: "How do I sell my NFT?",
        answer:
          "To sell your NFT: 1) Go to your profile, 2) Find the NFT you want to sell, 3) Click 'List for Sale', 4) Set your price and listing type (fixed price or auction), 5) Confirm the transaction. Your NFT will be listed on the marketplace.",
      },
      {
        id: "payment-methods",
        question: "What payment methods are accepted?",
        answer:
          "We accept Ethereum (ETH) and other ERC-20 tokens for purchases. You'll need cryptocurrency in your wallet to make purchases. We're working on adding credit card payments in the future.",
      },
      {
        id: "cancel-listing",
        question: "Can I cancel a listing?",
        answer:
          "Yes, you can cancel active listings at any time from your profile. Simply go to your listed items and click 'Cancel Listing'. Note that you'll need to pay a small gas fee to cancel the listing on the blockchain.",
      },
    ],
  },
  {
    id: "wallet-security",
    category: "Wallet & Security",
    icon: Wallet,
    color: "primary",
    faqs: [
      {
        id: "connect-wallet",
        question: "How do I connect my wallet?",
        answer:
          "Click the 'Connect Wallet' button, select your wallet type, and approve the connection in your wallet app. Make sure you're on the correct network (Ethereum mainnet) and have some ETH for transaction fees.",
      },
      {
        id: "wallet-secure",
        question: "Is my wallet secure?",
        answer:
          "Your wallet security depends on how you manage your private keys. We never store your private keys - they remain in your wallet. Always use hardware wallets for large amounts, never share your seed phrase, and be cautious of phishing attempts.",
      },
      {
        id: "lost-wallet",
        question: "What if I lose access to my wallet?",
        answer:
          "If you lose access to your wallet, you'll need your seed phrase to recover it. AUREUSNOVA cannot recover lost wallets or NFTs. This is why it's crucial to securely backup your seed phrase when creating a wallet.",
      },
      {
        id: "gas-fees",
        question: "Why do I need ETH for gas fees?",
        answer:
          "Gas fees are required for all Ethereum transactions, including buying, selling, and transferring NFTs. These fees go to Ethereum miners, not to AUREUSNOVA. Gas fees vary based on network congestion.",
      },
    ],
  },
  {
    id: "creating-minting",
    category: "Creating & Minting",
    icon: CreditCard,
    color: "secondary",
    faqs: [
      {
        id: "mint-first-nft",
        question: "How do I mint my first NFT?",
        answer:
          "To mint an NFT: 1) Go to 'Create', 2) Upload your digital file (image, video, audio), 3) Add title, description, and properties, 4) Choose collection and royalty settings, 5) Pay the minting fee. Your NFT will be created on the blockchain.",
      },
      {
        id: "file-types",
        question: "What file types are supported?",
        answer:
          "We support JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, and GLB files. Maximum file size is 100MB. High-quality images (at least 1080x1080) are recommended for best display.",
      },
      {
        id: "royalties",
        question: "What are royalties?",
        answer:
          "Royalties are automatic payments to the original creator every time their NFT is resold. You can set royalties from 0-10% when minting. This provides ongoing income from your creative work.",
      },
      {
        id: "edit-nft",
        question: "Can I edit my NFT after minting?",
        answer:
          "Once minted on the blockchain, the core NFT data cannot be changed. However, you can update the description, external links, and some metadata through your collection settings.",
      },
    ],
  },
  {
    id: "fees-payments",
    category: "Fees & Payments",
    icon: Shield,
    color: "primary",
    faqs: [
      {
        id: "platform-fees",
        question: "What fees does AUREUSNOVA charge?",
        answer:
          "AUREUSNOVA charges a 2.5% marketplace fee on all sales. Creators can set royalties up to 10%. Additionally, you'll pay Ethereum gas fees for blockchain transactions. Browsing is always free.",
      },
      {
        id: "fee-deduction",
        question: "When are fees deducted?",
        answer:
          "Marketplace fees are automatically deducted when a sale is completed. The seller receives the sale price minus our fee and any creator royalties. Gas fees are paid upfront for each transaction.",
      },
      {
        id: "high-gas-fees",
        question: "Why are gas fees so high?",
        answer:
          "Gas fees fluctuate based on Ethereum network congestion. During busy periods, fees can be high. We recommend using gas trackers to find optimal transaction times, typically early mornings or weekends.",
      },
      {
        id: "failed-transactions",
        question: "Do I get charged for failed transactions?",
        answer:
          "If a transaction fails due to insufficient gas or other errors, you may still pay gas fees to miners. However, AUREUSNOVA marketplace fees are only charged on successful transactions.",
      },
    ],
  },
];

export const termsDescription = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
    color: "purple",
    content: `By accessing or using AUREUSNOVA ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Platform. These Terms constitute a legally binding agreement between you and AUREUSNOVA Inc.`,
  },
  {
    id: "platform-description",
    title: "Platform Description",
    icon: Users,
    color: "cyan",
    content: `AUREUSNOVA is a digital marketplace that allows users to create, buy, sell, and trade non-fungible tokens (NFTs). The Platform facilitates transactions between users but does not own, control, or guarantee the authenticity of any NFTs listed on the marketplace.`,
  },
  {
    id: "user-eligibility",
    title: "User Eligibility",
    icon: Shield,
    color: "pink",
    content: `You must be at least 18 years old to use this Platform. By using the Platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all terms and conditions. You are also responsible for ensuring your use complies with applicable local laws.`,
  },
  {
    id: "account-registration",
    title: "Account Registration & Wallet Connection",
    icon: Users,
    color: "blue",
    content: `To use certain features of the Platform, you must connect a compatible cryptocurrency wallet. You are responsible for maintaining the security of your wallet and private keys. AUREUSNOVA is not responsible for any loss of access to your wallet or associated digital assets.`,
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    icon: Scale,
    color: "purple",
    content: `Users agree not to: (a) use the Platform for any unlawful purpose or in violation of these Terms; (b) upload, post, or transmit any content that infringes intellectual property rights; (c) engage in fraudulent activities or market manipulation; (d) attempt to hack, disrupt, or damage the Platform; (e) create fake accounts or misrepresent your identity.`,
  },
  {
    id: "nft-transactions",
    title: "NFT Transactions",
    icon: Gavel,
    color: "cyan",
    content: `All NFT transactions are facilitated through smart contracts on the blockchain. Once a transaction is confirmed on the blockchain, it cannot be reversed. Users are responsible for verifying all transaction details before confirming. AUREUSNOVA charges a marketplace fee on successful transactions as disclosed at the time of listing.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: Shield,
    color: "pink",
    content: `Users must own or have proper licensing rights for any content they upload or mint as NFTs. By listing content on the Platform, you grant AUREUSNOVA a limited license to display and market your content. Users are responsible for any intellectual property infringement claims related to their content.`,
  },
  {
    id: "platform-availability",
    title: "Platform Availability",
    icon: AlertTriangle,
    color: "orange",
    content: `While we strive to maintain continuous service, the Platform may experience downtime for maintenance, updates, or due to circumstances beyond our control. We do not guarantee uninterrupted access and are not liable for any losses resulting from service interruptions.`,
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    icon: AlertTriangle,
    color: "red",
    content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THE ACCURACY, RELIABILITY, OR AVAILABILITY OF THE PLATFORM.`,
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    icon: Scale,
    color: "purple",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, AUREUSNOVA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
  },
  {
    id: "indemnification",
    title: "Indemnification",
    icon: Shield,
    color: "cyan",
    content: `You agree to indemnify and hold harmless AUREUSNOVA and its officers, directors, employees, and agents from any claims, damages, losses, costs, and expenses arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.`,
  },
  {
    id: "termination",
    title: "Termination",
    icon: AlertTriangle,
    color: "orange",
    content: `We may terminate or suspend your access to the Platform at any time, with or without cause or notice. Upon termination, your right to use the Platform ceases immediately. Provisions that by their nature should survive termination shall survive.`,
  },
  {
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    icon: Gavel,
    color: "pink",
    content: `These Terms are governed by the laws of Delaware, United States, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.`,
  },
  {
    id: "changes-terms",
    title: "Changes to Terms",
    icon: FileText,
    color: "blue",
    content: `We reserve the right to modify these Terms at any time. We will notify users of material changes through the Platform or via email. Your continued use of the Platform after changes constitutes acceptance of the new Terms. If you disagree with the changes, you must stop using the Platform.`,
  },
];

export const importantNotices = [
  {
    title: "Cryptocurrency Risks",
    description:
      "Cryptocurrency transactions are irreversible and subject to market volatility. You may lose money.",
    color: "red",
  },
  {
    title: "Smart Contract Risks",
    description:
      "Smart contracts may contain bugs or vulnerabilities. We are not responsible for smart contract failures.",
    color: "orange",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Users are responsible for complying with applicable laws and regulations in their jurisdiction.",
    color: "purple",
  },
  {
    title: "No Investment Advice",
    description:
      "Nothing on this Platform constitutes investment, financial, or legal advice.",
    color: "cyan",
  },
];

export const complianceCountries = [
  {
    icon: "🌍",
    text: "GDPR (European Union)",
    color: "primary",
  },
  {
    icon: "🇺🇸",
    text: "CCPA (California, USA)",
    color: "secondary",
  },
  {
    icon: "🇨🇦",
    text: "PIPEDA (Canada)",
    color: "primary",
  },
  {
    icon: "⚖️",
    text: "Other applicable local laws",
    color: "secondary",
  },
];

export const partnerTiers = [
  {
    tier: "Platinum",
    color: "purple",
    benefits: [
      "Priority API access",
      "Dedicated account manager",
      "Co-marketing opportunities",
      "Revenue sharing program",
      "White-label solutions",
    ],
    minVolume: "$1M+ monthly volume",
  },
  {
    tier: "Gold",
    color: "cyan",
    benefits: [
      "Enhanced API limits",
      "Marketing collaboration",
      "Technical support",
      "Fee discounts",
    ],
    minVolume: "$500K+ monthly volume",
  },
  {
    tier: "Silver",
    color: "pink",
    benefits: [
      "Standard API access",
      "Community features",
      "Basic integration support",
    ],
    minVolume: "$100K+ monthly volume",
  },
];

export const featuredPartners = [
  {
    name: "MetaGallery",
    type: "Marketplace",
    description:
      "Premium digital art marketplace focusing on high-end collectibles",
    logo: "/placeholder.svg",
    tier: "Platinum",
    integration: "Full API Integration",
    volume: "$2.5M monthly",
    joinDate: "January 2023",
  },
  {
    name: "CryptoWallet Pro",
    type: "Wallet Provider",
    description: "Next-generation crypto wallet with built-in NFT management",
    logo: "/placeholder.svg",
    tier: "Gold",
    integration: "WalletConnect",
    volume: "$800K monthly",
    joinDate: "March 2023",
  },
  {
    name: "GameVerse Studios",
    type: "Gaming Platform",
    description: "Play-to-earn gaming platform with NFT asset integration",
    logo: "/placeholder.svg",
    tier: "Gold",
    integration: "Gaming API",
    volume: "$650K monthly",
    joinDate: "June 2023",
  },
  {
    name: "ArtChain Analytics",
    type: "Analytics Provider",
    description: "Advanced NFT market analytics and valuation platform",
    logo: "/placeholder.svg",
    tier: "Silver",
    integration: "Data Partnership",
    volume: "$200K monthly",
    joinDate: "September 2023",
  },
];

export const partnerTypes = [
  {
    type: "Marketplaces",
    icon: Globe,
    description: "NFT marketplaces and trading platforms",
    count: 15,
    examples: [
      "Secondary markets",
      "Specialized platforms",
      "Regional exchanges",
    ],
    color: "purple",
  },
  {
    type: "Wallet Providers",
    icon: Shield,
    description: "Cryptocurrency and NFT wallet services",
    count: 12,
    examples: ["Hardware wallets", "Mobile wallets", "Browser extensions"],
    color: "cyan",
  },
  {
    type: "Gaming Platforms",
    icon: Zap,
    description: "Blockchain gaming and metaverse platforms",
    count: 8,
    examples: ["Play-to-earn games", "Virtual worlds", "GameFi protocols"],
    color: "pink",
  },
  {
    type: "DeFi Protocols",
    icon: TrendingUp,
    description: "Decentralized finance and lending platforms",
    count: 6,
    examples: ["NFT lending", "Liquidity pools", "Yield farming"],
    color: "blue",
  },
  {
    type: "Analytics & Tools",
    icon: Database,
    description: "Market data and developer tools",
    count: 10,
    examples: ["Price tracking", "Portfolio tools", "API services"],
    color: "orange",
  },
  {
    type: "Creative Platforms",
    icon: Palette,
    description: "Art creation and design platforms",
    count: 7,
    examples: ["AI art tools", "Design software", "Creator platforms"],
    color: "purple",
  },
];

export const integrationOptions = [
  {
    name: "AUREUSNOVA API",
    description: "Full marketplace integration with our RESTful API",
    features: [
      "Real-time data",
      "Trading functions",
      "User management",
      "Analytics",
    ],
    technical: "REST API, WebSocket support",
    icon: Code,
    color: "cyan",
  },
  {
    name: "Widget Integration",
    description: "Embeddable NFT widgets for your platform",
    features: [
      "Collection display",
      "User profiles",
      "Trading interface",
      "Customizable UI",
    ],
    technical: "JavaScript SDK, React components",
    icon: Layers,
    color: "purple",
  },
  {
    name: "White Label Solution",
    description: "Complete marketplace solution with your branding",
    features: [
      "Custom domain",
      "Branded interface",
      "Full control",
      "Dedicated support",
    ],
    technical: "Hosted solution, Custom deployment",
    icon: Palette,
    color: "pink",
  },
  {
    name: "Data Partnership",
    description: "Access to market data and analytics",
    features: [
      "Historical data",
      "Real-time feeds",
      "Market insights",
      "Custom reports",
    ],
    technical: "GraphQL API, Data exports",
    icon: Database,
    color: "blue",
  },
];

export const whyBuild = [
  {
    icon: TrendingUp,
    title: "Market Leadership",
    description:
      "Access to one of the largest NFT trading volumes and user bases",
    color: "purple",
  },
  {
    icon: Code,
    title: "Robust APIs",
    description: "Well-documented, reliable APIs with 99.9% uptime",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security and compliance standards",
    color: "pink",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Technical and business support from our partnership team",
    color: "blue",
  },
  {
    icon: Award,
    title: "Revenue Sharing",
    description: "Competitive revenue sharing and fee structures",
    color: "orange",
  },
  {
    icon: Heart,
    title: "Co-Marketing",
    description: "Joint marketing opportunities and brand collaboration",
    color: "purple",
  },
];

export const policySections: PolicySection[] = [
  {
    id: "introduction",
    title: "Quantum Cookie Protocol",
    icon: Cookie,
    color: "primary",
    content:
      "In compliance with interstellar data regulations as of 2025, AUREUSNOVA deploys quantum-encrypted cookies to enhance your multiverse navigation. These digital artifacts track your Web3 interactions while preserving zero-knowledge privacy.",
  },
  {
    id: "types",
    title: "Cookie Classifications",
    icon: Shield,
    color: "secondary",
    content:
      "Essential Quantum Bits: Required for core platform entanglement. Analytical Nodes: Aggregate anonymous metrics for AI optimization. Targeting Photons: Personalize your metaverse experience with decentralized ads. All cookies are blockchain-audited and self-destruct after 365 solar cycles.",
  },
  {
    id: "management",
    title: "Cookie Governance",
    icon: Zap,
    color: "primary",
    content:
      "Exercise your sovereign rights via our neural consent interface. Opt-out of non-essential cookies through your profile oracle. Note: Disabling may disrupt hyperspace functionality. We honor Do Not Track signals from quantum browsers.",
  },
  {
    id: "updates",
    title: "Protocol Evolutions",
    icon: ArrowRight,
    color: "secondary",
    content:
      "This policy undergoes quantum upgrades periodically. Last revision: September 23, 2025. Continued platform immersion implies acceptance of updates. For inquiries, consult our AI compliance oracle.",
  },
];
