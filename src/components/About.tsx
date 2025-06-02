
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    t('about.feature.quest'),
    t('about.feature.leveling'),
    t('about.feature.rewards'),
    t('about.feature.buffs'),
    t('about.feature.ai'),
    t('about.feature.multilingual'),
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold hologram-text mb-2 flex items-center justify-center gap-3">
          <Info className="w-8 h-8 text-primary" />
          {t('about.title')}
        </h2>
        <p className="text-muted-foreground">{t('about.subtitle')}</p>
      </div>

      {/* Description Card */}
      <Card className="glass border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="font-orbitron flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Become A Player
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.description')}
          </p>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card className="glass border-green-500/20 shadow-lg">
        <CardHeader>
          <CardTitle className="font-orbitron flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            {t('about.features')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-muted/20">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Version & Credits Card */}
      <Card className="glass border-purple-500/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {t('about.version')} 1.0.0
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('about.developer')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
