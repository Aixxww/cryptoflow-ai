#!/bin/bash
# 币安AI龙爪手 - 一键安装脚本 / Binance AI Dragon Claw - One-Click Installation Script
# / Binance AI Dragon Claw - One-Click Installation Script

set -e

# 颜色输出 / Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 打印函数 / Print functions
print_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在 / Check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed. Please install it first."
        return 1
    fi
    return 0
}

# 检查 OpenClaw 是否运行 / Check if OpenClaw is running
check_openclaw() {
    if ! curl -s http://localhost:18789/health &> /dev/null; then
        print_warning "OpenClaw is not running at http://localhost:18789"
        print_info "Please start OpenClaw first: openclaw start"
        return 1
    fi
    print_success "OpenClaw is running"
    return 0
}

# 安装 Binance Skills / Install Binance Skills
install_binance_skills() {
    print_header "Installing Binance Skills for OpenClaw"

    # 获取 6551 token / Get 6551 token
    print_info "Checking 6551 MCP configuration..."

    OPENCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
    if [ ! -f "$OPENCLAW_CONFIG" ]; then
        print_warning "OpenClaw config not found. Skipping Binance skills installation."
        return 0
    fi

    # 提取 6551 token
    TWITTER_TOKEN=$(jq -r '.skills.entries["6551-opentwitter"].env.TWITTER_TOKEN // empty' "$OPENCLAW_CONFIG" 2>/dev/null || echo "")
    OPENNEWS_TOKEN=$(jq -r '.skills.entries["6551-opennews"].env.OPENNEWS_TOKEN // empty' "$OPENCLAW_CONFIG" 2>/dev/null || echo "")

    if [ -z "$TWITTER_TOKEN" ]; then
        print_warning "6551 OpenTwitter token not found in OpenClaw config."
        print_info "Visit https://6551.io/mcp to get your token"
    fi

    if [ -z "$OPENNEWS_TOKEN" ]; then
        print_warning "6551 OpenNews token not found in OpenClaw config."
        print_info "Visit https://6551.io/mcp to get your token"
    fi

    # 创建 Binance skill 配置 / Create Binance skill config
    mkdir -p ./openclaw-skills/binance-trader

    # 创建 Binance Trading skill
    cat > "./openclaw-skills/binance-trader/skill.json" << 'EOF'
{
  "name": "binance-trader",
  "version": "1.0.0",
  "description": "Binance Trading Skill - Execute trades and manage positions",
  "author": "CryptoFlow AI",
  "main": "index.js",
  "dependencies": {
    "binance-api-node": "^0.15.0"
  },
  "env": {
    "BINANCE_API_KEY": "${BINANCE_API_KEY}",
    "BINANCE_API_SECRET": "${BINANCE_API_SECRET}",
    "BINANCE_TESTNET": "false"
  },
  "commands": [
    {
      "name": "get_balance",
      "description": "Get account balance",
      "handler": "getBalance"
    },
    {
      "name": "get_positions",
      "description": "Get current positions",
      "handler": "getPositions"
    },
    {
      "name": "place_order",
      "description": "Place a new order",
      "handler": "placeOrder",
      "params": ["symbol", "side", "type", "quantity"]
    },
    {
      "name": "cancel_order",
      "description": "Cancel an order",
      "handler": "cancelOrder",
      "params": ["orderId"]
    }
  ]
}
EOF

    print_success "Binance Trading skill configuration created"

    # 创建 Binance Market skill
    mkdir -p ./openclaw-skills/binance-market
    cat > "./openclaw-skills/binance-market/skill.json" << 'EOF'
{
  "name": "binance-market",
  "version": "1.0.0",
  "description": "Binance Market Data - Real-time prices and market depth",
  "author": "CryptoFlow AI",
  "main": "index.js",
  "commands": [
    {
      "name": "get_ticker",
      "description": "Get 24hr ticker price change statistics",
      "handler": "getTicker",
      "params": ["symbol"]
    },
    {
      "name": "get_tickers",
      "description": "Get all 24hr ticker price change statistics",
      "handler": "getTickers"
    },
    {
      "name": "get_orderbook",
      "description": "Get order book depth",
      "handler": "getOrderBook",
      "params": ["symbol", "limit"]
    },
    {
      "name": "get_klines",
      "description": "Get candlestick/kline bars",
      "handler": "getKlines",
      "params": ["symbol", "interval", "limit"]
    }
  ]
}
EOF

    print_success "Binance Market skill configuration created"

    # 创建 Binance Square skill
    mkdir -p ./openclaw-skills/binance-square
    cat > "./openclaw-skills/binance-square/skill.json" << 'EOF'
{
  "name": "binance-square",
  "version": "1.0.0",
  "description": "Binance Square - Social trading and copy trading integration",
  "author": "CryptoFlow AI",
  "main": "index.js",
  "env": {
    "SQUARE_API_KEY": "${SQUARE_API_KEY}"
  },
  "commands": [
    {
      "name": "get_posts",
      "description": "Get Binance Square posts",
      "handler": "getPosts",
      "params": ["limit"]
    },
    {
      "name": "create_post",
      "description": "Create a new post on Binance Square",
      "handler": "createPost",
      "params": ["content"]
    },
    {
      "name": "publish_trade",
      "description": "Publish a trade to Binance Square",
      "handler": "publishTrade",
      "params": ["tradeData"]
    }
  ]
}
EOF

    print_success "Binance Square skill configuration created"

    print_info "To activate these skills, run:"
    echo "  openclaw skill add ./openclaw-skills/binance-trader"
    echo "  openclaw skill add ./openclaw-skills/binance-market"
    echo "  openclaw skill add ./openclaw-skills/binance-square"
}

# 配置项目 / Configure project
configure_project() {
    print_header "Configuring CryptoFlow AI Project"

    # 检查 .env 文件 / Check .env file
    if [ ! -f ".env.local" ]; then
        print_info "Creating .env.local from .env.example"
        cp .env.example .env.local
        print_success ".env.local created"
    fi

    # 获取 OpenClaw auth token / Get OpenClaw auth token
    GATEWAY_TOKEN=$(jq -r '.gateway.token // empty' "$OPENCLAW_CONFIG" 2>/dev/null || echo "your_openclaw_token_here")

    # 更新 API 路由的 OpenClaw 配置 / Update OpenClaw config in API routes
    find ./app/api -name "route.ts" -exec sed -i.bak \
      "s|OPENCLAW_TOKEN = '.*'|OPENCLAW_TOKEN = '$GATEWAY_TOKEN'|g" {} \;

    # 删除备份文件 / Remove backup files
    find ./app/api -name "*.bak" -delete 2>/dev/null || true

    print_success "OpenClaw API token configured"
}

# 启动项目 / Start project
start_project() {
    print_header "Starting CryptoFlow AI"

    # 检查 Node.js / Check Node.js
    if ! check_command "node" || ! check_command "npm"; then
        print_error "Node.js or npm is not installed"
        return 1
    fi

    # 安装依赖 / Install dependencies
    print_info "Installing dependencies..."
    npm install --silent

    # 启动开发服务器 / Start dev server
    print_success "Starting development server on port 8848..."
    print_info "Visit http://localhost:8848 to access the application"
    echo ""
    print_info "Press Ctrl+C to stop the server"
    echo ""

    npm run dev
}

# 主流程 / Main flow
main() {
    echo -e "${CYAN}"
    echo "████████╗███████╗██████╗ ███╗   ███╗██╗ ██████╗ ██████╗ ██████╗ ███████╗██╗"
    echo "╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║"
    echo "   ██║   █████╗  ██████╔╝██╔████╔██║██║██║     ██████╔╝██████╔╝█████╗  ██║"
    echo "   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║     ██╔══██╗██╔══██╗██╔══╝  ╚═╝"
    echo "   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║╚██████╗██║  ██║██║  ██║███████╗██╗"
    echo "   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝"
    echo -e "${NC}"
    echo "Binance AI Dragon Claw - OpenClaw Powered Trading Platform"
    echo ""

    # 检查 OpenClaw / Check OpenClaw
    check_openclaw || print_warning "OpenClaw not running, some features may not work."

    # 安装 Binance Skills / Install Binance Skills
    install_binance_skills

    # 配置项目 / Configure project
    configure_project

    # 询问是否启动 / Ask if user wants to start
    echo ""
    read -p "Do you want to start the development server now? (y/n)" -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        start_project
    else
        print_success "Setup complete! Run 'npm run dev' to start the server."
    fi
}

# 运行主流程 / Run main flow
main "$@"
