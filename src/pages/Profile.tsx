import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Crown, 
  Shield, 
  Heart, 
  Zap, 
  Trophy, 
  Star, 
  Calendar, 
  MapPin, 
  Mail, 
  Edit3,
  Save,
  Settings,
  Award,
  BookOpen,
  Users,
  Target,
  LogOut
} from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { AudioProvider } from "@/components/AudioManager";
import { useAuth } from "@/auth";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [userProfile, setUserProfile] = useState({
    name: user?.username || "Guest Wizard", 
    email: user?.email || "wizard@hogwarts.edu",
    house: "gryffindor",
    year: "1st Year",
    location: "Hogwarts Castle",
    bio: "A new student at Hogwarts, eager to learn the magical arts and discover their true house.",
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    avatar: "/api/placeholder/150/150",
    level: 1,
    totalXP: 100,
    nextLevelXP: 500,
    wandCore: "Unknown",
    patronus: "Unknown"
  });

  const profileRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // House data mapping
  const houseData = {
    gryffindor: {
      icon: Crown,
      colors: 'text-gryffindor-primary',
      bgColors: 'bg-gradient-gryffindor',
      borderColors: 'border-gryffindor-primary',
      traits: ['Brave', 'Daring', 'Chivalrous', 'Courageous'],
      motto: '"Their daring, nerve, and chivalry set Gryffindors apart"',
      element: '🦁'
    },
    ravenclaw: {
      icon: Zap,
      colors: 'text-ravenclaw-primary',
      bgColors: 'bg-gradient-ravenclaw',
      borderColors: 'border-ravenclaw-primary',
      traits: ['Wise', 'Clever', 'Creative', 'Curious'],
      motto: '"Wit beyond measure is man\'s greatest treasure"',
      element: '🦅'
    },
    hufflepuff: {
      icon: Heart,
      colors: 'text-hufflepuff-primary',
      bgColors: 'bg-gradient-hufflepuff',
      borderColors: 'border-hufflepuff-primary',
      traits: ['Loyal', 'Kind', 'Patient', 'Hardworking'],
      motto: '"Those patient Hufflepuffs are true and unafraid of toil"',
      element: '🦡'
    },
    slytherin: {
      icon: Shield,
      colors: 'text-slytherin-primary',
      bgColors: 'bg-gradient-slytherin',
      borderColors: 'border-slytherin-primary',
      traits: ['Ambitious', 'Cunning', 'Resourceful', 'Determined'],
      motto: '"Slytherin will help you on the way to greatness"',
      element: '🐍'
    }
  };

  const currentHouse = houseData[userProfile.house as keyof typeof houseData];
  const HouseIcon = currentHouse.icon;

  // Mock data
  const achievements = [
    { name: "Sorting Hat Graduate", description: "Successfully completed the sorting ceremony", earned: true, date: "Sep 1, 2024", rarity: "common" },
    { name: "House Pride", description: "Earned 100 house points", earned: true, date: "Sep 15, 2024", rarity: "uncommon" },
    { name: "Magical Scholar", description: "Completed 10 magical courses", earned: true, date: "Oct 1, 2024", rarity: "rare" },
    { name: "Prefect", description: "Became a house prefect", earned: false, date: "", rarity: "legendary" },
    { name: "Head Student", description: "Achieved head student status", earned: false, date: "", rarity: "legendary" }
  ];

  const magicalStats = [
    { label: "Quizzes Completed", value: 42, icon: BookOpen },
    { label: "House Points Earned", value: 285, icon: Star },
    { label: "Friends Made", value: 18, icon: Users },
    { label: "Days Active", value: 127, icon: Calendar }
  ];

  const recentActivity = [
    { action: "Completed Advanced Transfiguration Quiz", date: "2 hours ago", points: 25 },
    { action: "Earned 'Potion Master' achievement", date: "1 day ago", points: 50 },
    { action: "Joined Defense Against Dark Arts study group", date: "3 days ago", points: 15 },
    { action: "Helped a first-year with homework", date: "1 week ago", points: 10 }
  ];

  useEffect(() => {
    if (profileRef.current) {
      gsap.fromTo(profileRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to your backend/Supabase
    console.log('Saving profile:', userProfile);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'uncommon': return 'text-green-600';
      case 'rare': return 'text-blue-600';
      case 'legendary': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AudioProvider>
      <MagicalBackground variant="hero">
        <div className="min-h-screen py-20 px-6">
          <div ref={profileRef} className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="font-magical text-4xl md:text-6xl text-amber-100 mb-4 drop-shadow-lg">
                Wizard Profile
              </h1>
              <p className="font-story text-xl text-amber-200 drop-shadow-md">
                Your magical journey at Hogwarts
              </p>
            </div>

            {/* Main Profile Card */}
            <Card className={`bg-amber-50/95 backdrop-blur-sm border-4 ${currentHouse.borderColors} shadow-magical`}>
              <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="bg-amber-800/80 border-amber-700 text-amber-100 hover:bg-amber-700 shadow-md"
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-amber-700 shadow-magical">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback className={`text-2xl ${currentHouse.bgColors} text-white`}>
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${currentHouse.bgColors} rounded-full flex items-center justify-center text-2xl border-2 border-amber-700 shadow-lg`}>
                      {currentHouse.element}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <Input
                          value={userProfile.name}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="text-2xl font-magical bg-amber-100/50 border-amber-600/50 text-amber-900"
                        />
                        <Textarea
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                          className="bg-amber-100/50 border-amber-600/50 text-amber-900"
                          rows={3}
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className={`text-3xl md:text-4xl font-magical mb-2 ${currentHouse.colors}`}>
                          {userProfile.name}
                        </h2>
                        <p className="font-story text-lg text-magical-dark mb-4">
                          {userProfile.bio}
                        </p>
                      </>
                    )}
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      {currentHouse.traits.map((trait) => (
                        <Badge key={trait} className="bg-amber-200/80 text-amber-900 border-amber-700">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-magical-dark">
                      <div className="flex items-center gap-1">
                        <HouseIcon className="w-4 h-4" />
                        <span>{userProfile.house.charAt(0).toUpperCase() + userProfile.house.slice(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{userProfile.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-magical text-lg text-magical-dark">
                      Level {userProfile.level} Wizard
                    </span>
                    <span className="text-sm text-magical-dark">
                      {userProfile.totalXP} / {userProfile.nextLevelXP} XP
                    </span>
                  </div>
                  <Progress 
                    value={(userProfile.totalXP / userProfile.nextLevelXP) * 100} 
                    className="h-3 bg-amber-200/60"
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Tabs Section */}
            <div ref={tabsRef}>
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-parchment border border-candlelight/30">
                  <TabsTrigger value="stats" className="font-story">Statistics</TabsTrigger>
                  <TabsTrigger value="achievements" className="font-story">Achievements</TabsTrigger>
                  <TabsTrigger value="activity" className="font-story">Activity</TabsTrigger>
                  <TabsTrigger value="settings" className="font-story">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {magicalStats.map((stat) => (
                      <Card key={stat.label} className="bg-amber-50/95 border-amber-600/50 shadow-magical">
                        <CardContent className="p-6 text-center">
                          <stat.icon className="w-8 h-8 text-amber-700 mx-auto mb-3" />
                          <div className="text-3xl font-magical text-amber-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm font-story text-amber-800/80">
                            {stat.label}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-parchment border-candlelight/30 shadow-magical">
                    <CardHeader>
                      <CardTitle className="font-magical text-magical-dark">Magical Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-story text-amber-900">Wand Core</Label>
                          <div className="mt-1 p-3 bg-amber-100/60 rounded border border-amber-600/40">
                            <span className="font-story text-amber-900">{userProfile.wandCore}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="font-story text-amber-900">Patronus</Label>
                          <div className="mt-1 p-3 bg-amber-100/60 rounded border border-amber-600/40">
                            <span className="font-story text-amber-900">{userProfile.patronus}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="font-story text-amber-900">House Motto</Label>
                        <div className="mt-1 p-3 bg-amber-100/60 rounded border border-amber-600/40">
                          <span className="font-story text-amber-900 italic">{currentHouse.motto}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <div className="grid gap-4">
                    {achievements.map((achievement) => (
                      <Card 
                        key={achievement.name} 
                        className={`bg-gradient-parchment border-candlelight/30 shadow-magical ${
                          achievement.earned ? 'border-l-4 border-l-candlelight' : 'opacity-60'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`text-3xl ${achievement.earned ? '🏆' : '🔒'}`}>
                              {achievement.earned ? '🏆' : '🔒'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-magical text-magical-dark">{achievement.name}</h3>
                                <Badge className={`${getRarityColor(achievement.rarity)} bg-transparent border`}>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className="font-story text-sm text-magical-dark/70 mb-2">
                                {achievement.description}
                              </p>
                              {achievement.earned && (
                                <div className="flex items-center gap-1 text-xs text-magical-dark/50">
                                  <Calendar className="w-3 h-3" />
                                  <span>Earned on {achievement.date}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card className="bg-gradient-parchment border-candlelight/30 shadow-magical">
                    <CardHeader>
                      <CardTitle className="font-magical text-magical-dark">Recent Activity</CardTitle>
                      <CardDescription className="font-story">Your latest magical adventures</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-amber-100/40 rounded border border-amber-600/30">
                          <div>
                            <p className="font-story text-amber-900">{activity.action}</p>
                            <p className="text-xs text-amber-800/70">{activity.date}</p>
                          </div>
                          <Badge className="bg-amber-200/80 text-amber-900 border-amber-700">
                            +{activity.points} XP
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card className="bg-gradient-parchment border-candlelight/30 shadow-magical">
                    <CardHeader>
                      <CardTitle className="font-magical text-magical-dark flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="font-story text-amber-900">Email Address</Label>
                          <Input 
                            value={userProfile.email}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-amber-100/50 border-amber-600/50 text-amber-900"
                          />
                        </div>
                        <div>
                          <Label className="font-story text-amber-900">Location</Label>
                          <Input 
                            value={userProfile.location}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                            className="bg-amber-100/50 border-amber-600/50 text-amber-900"
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <Button className="bg-amber-800/80 text-amber-100 hover:bg-amber-800">
                            Save Changes
                          </Button>
                          <Button variant="outline" className="border-amber-600/50 text-amber-800 hover:bg-amber-100/50">
                            Reset Password
                          </Button>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-amber-600/20">
                          <Button 
                            variant="destructive" 
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                            onClick={() => {
                              logout();
                              navigate('/');
                            }}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                          <p className="text-xs text-amber-700/70 text-center mt-2 font-story">
                            You will be redirected to the home page
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MagicalBackground>
    </AudioProvider>
  );
};

export default Profile;