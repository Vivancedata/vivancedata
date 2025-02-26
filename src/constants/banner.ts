export interface BannerContent {
  badge: {
    icon: string;
    text: string;
  };
  heading: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  buttons: {
    primary: {
      text: string;
      icon: string;
    };
    secondary: {
      text: string;
    };
  };
  card: {
    title: string;
    description: string;
    buttonText: string;
    buttonIcon: string;
  };
}

export const bannerContent: BannerContent = {
  badge: {
    icon: "sparkles",
    text: "AI-Powered Innovation"
  },
  heading: {
    prefix: "AI Solutions That ",
    highlight: "Transform",
    suffix: " Your Business"
  },
  description: "Leverage cutting-edge artificial intelligence to drive innovation, efficiency, and growth for your organization.",
  buttons: {
    primary: {
      text: "Get Started",
      icon: "chevronRight"
    },
    secondary: {
      text: "Learn More"
    }
  },
  card: {
    title: "Ready to Transform?",
    description: "Schedule a free consultation with our AI experts",
    buttonText: "Book Now",
    buttonIcon: "arrowRight"
  }
};

export const particlesConfig = {
  count: 20,
  sizeMin: 5,
  sizeMax: 15,
  animationDurationMin: 5,
  animationDurationMax: 10,
  delayMax: 5
};
