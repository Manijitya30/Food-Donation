import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Heart, Users, Truck, Building2, ArrowRight, CheckCircle, Utensils, Leaf } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: 'Easy Donations',
      description: 'Donate surplus food in just a few clicks. Our platform makes it simple to share your excess with those in need.',
    },
    {
      icon: Truck,
      title: 'Quick Delivery',
      description: 'Our dedicated riders ensure food reaches organizations quickly, maintaining freshness and quality.',
    },
    {
      icon: Building2,
      title: 'Verified Organizations',
      description: 'We partner with verified NGOs, shelters, and orphanages to ensure your donations reach the right people.',
    },
    {
      icon: Leaf,
      title: 'Reduce Waste',
      description: 'Help reduce food waste while making a positive impact on the environment and your community.',
    },
  ];

  const stats = [
    { value: '52,340+', label: 'Meals Served' },
    { value: '1,247+', label: 'Donations Made' },
    { value: '89+', label: 'Active Donors' },
    { value: '15+', label: 'Partner Organizations' },
  ];

  const howItWorks = [
    { step: '01', title: 'Sign Up', description: 'Create your account as a donor, rider, or organization' },
    { step: '02', title: 'Donate Food', description: 'List your surplus food with pickup details' },
    { step: '03', title: 'We Match', description: 'Our system assigns a rider and organization' },
    { step: '04', title: 'Delivered!', description: 'Food reaches those who need it most' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full text-sm font-medium text-accent-foreground mb-6">
              <Utensils className="w-4 h-4" />
              Fighting hunger, one meal at a time
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Share Food,{' '}
              <span className="text-gradient-primary">Share Hope</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              NourishNet connects food donors with organizations in need. 
              Together, we can reduce food waste and feed those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth/signup">
                  Start Donating
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/auth/signup?role=organisation">
                  Register Organization
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-card rounded-2xl shadow-md border border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose NourishNet?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a seamless platform that makes food donation effortless and impactful.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 bg-background rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to make a difference.
            </p>
          </div>

          <div className="relative grid md:grid-cols-4 gap-12">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative text-center">
                
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-primary 
                                flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-display font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {item.description}
                </p>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 
                                  w-full h-0.5 bg-border translate-x-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-primary rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of donors, riders, and organizations working together to end hunger in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-secondary" size="lg" asChild className="bg-card text-foreground hover:bg-card/90">
                <Link to="/auth/signup">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Nourish<span className="text-primary">Net</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 NourishNet. All rights reserved. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
