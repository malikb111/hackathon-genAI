"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, ChartBar, Sparkles } from "lucide-react";

// Animation variants améliorés
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			duration: 0.8,
			ease: "easeOut"
		}
	}
};

const itemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut"
		}
	}
};

// Caractéristiques business
const businessFeatures = [
	{
		icon: <Target className="w-6 h-6 text-primary" />,
		title: "Conversion x3",
		description: "Triplez vos taux de conversion avec des leads ultra-qualifiés"
	},
	{
		icon: <Users className="w-6 h-6 text-primary" />,
		title: "ROI Immédiat",
		description: "Rentabilisez votre investissement dès le premier mois"
	},
	{
		icon: <ChartBar className="w-6 h-6 text-primary" />,
		title: "Croissance",
		description: "Développez votre business avec des prospects prêts à l'action"
	}
];

export default function Page() {
	return (
		<div className="h-[calc(100vh-4rem)] flex flex-col justify-between p-8">
			{/* En-tête avec accroche business */}
			<motion.div 
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<Badge variant="secondary" className="mb-6">
					<Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
					Jusqu'à 300% de croissance
				</Badge>
				<h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
					Transformez vos visiteurs en clients
				</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Obtenez des leads qualifiés prêts à acheter, sans effort
				</p>
			</motion.div>

			{/* Cartes des bénéfices business */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-3 gap-6 w-full max-w-5xl mx-auto"
			>
				{businessFeatures.map((feature, index) => (
					<motion.div key={index} variants={itemVariants}>
						<Card className="group hover:shadow-xl transition-all duration-500 border-primary/10">
							<CardContent className="p-6">
								<div className="mb-4 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary/10 transition-all duration-500 transform group-hover:scale-110">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2 text-primary/90">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{/* Section CTA */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="text-center space-y-8"
			>
				<h2 className="text-2xl font-semibold text-primary/90">
					Prêt à booster votre business ?
				</h2>

				<div className="flex gap-4 justify-center">
					<Link href="/onboarding/step1">
						<Button size="lg" className="group px-8 py-6 text-lg">
							Commencer
							<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</Link>
					<Button variant="outline" size="lg" className="px-8 py-6 text-lg">
						Voir une démo
					</Button>
				</div>
			</motion.div>
		</div>
	);
}
