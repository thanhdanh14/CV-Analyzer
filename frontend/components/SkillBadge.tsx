'use client'

interface SkillBadgeProps {
  skill: string
}

const skillIcons: { [key: string]: string } = {
  // Frontend
  'react': '⚛️',
  'reactjs': '⚛️',
  'vue': '💚',
  'vuejs': '💚',
  'angular': '🅰️',
  'javascript': '🟨',
  'js': '🟨',
  'typescript': '🔷',
  'ts': '🔷',
  'html': '🌐',
  'html5': '🌐',
  'css': '🎨',
  'css3': '🎨',
  'tailwind': '🌊',
  'tailwindcss': '🌊',
  'bootstrap': '🅱️',
  'sass': '💗',
  'scss': '💗',
  'nextjs': '▲',
  'next.js': '▲',
  
  // Backend
  'python': '🐍',
  'java': '☕',
  'nodejs': '🟢',
  'node.js': '🟢',
  'node': '🟢',
  'php': '🐘',
  'ruby': '💎',
  'go': '🔵',
  'golang': '🔵',
  'c#': '🔷',
  'csharp': '🔷',
  'c++': '⚙️',
  'rust': '🦀',
  
  // Frameworks
  'django': '🎸',
  'flask': '🧪',
  'fastapi': '⚡',
  'express': '🚂',
  'expressjs': '🚂',
  'spring': '🍃',
  'laravel': '🔺',
  'rails': '🛤️',
  
  // Database
  'sql': '🗄️',
  'mysql': '🐬',
  'postgresql': '🐘',
  'postgres': '🐘',
  'mongodb': '🍃',
  'mongo': '🍃',
  'redis': '🔴',
  'sqlite': '💾',
  
  // DevOps & Tools
  'docker': '🐳',
  'kubernetes': '☸️',
  'k8s': '☸️',
  'git': '📦',
  'github': '🐙',
  'gitlab': '🦊',
  'aws': '☁️',
  'azure': '☁️',
  'gcp': '☁️',
  'linux': '🐧',
  'jenkins': '👨‍🔧',
  'ci/cd': '🔄',
  
  // Mobile
  'android': '🤖',
  'ios': '🍎',
  'flutter': '🦋',
  'react native': '📱',
  'swift': '🦅',
  'kotlin': '🟣',
  
  // Other
  'api': '🔌',
  'rest': '🔌',
  'graphql': '📊',
  'testing': '🧪',
  'agile': '🔄',
  'scrum': '🏉',
  'figma': '🎨',
  'photoshop': '🖼️',
  'illustrator': '✏️',
  'ui/ux': '🎨',
  'design': '🎨',
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const skillLower = skill.toLowerCase().trim()
  const icon = skillIcons[skillLower] || '🔧'
  
  const colors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-green-100 text-green-700 border-green-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-pink-100 text-pink-700 border-pink-200',
    'bg-indigo-100 text-indigo-700 border-indigo-200',
  ]
  
  const colorIndex = skill.length % colors.length
  const colorClass = colors[colorIndex]

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        border-2 font-medium text-sm
        transition-all duration-300 hover:scale-110 hover:shadow-md
        ${colorClass}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span>{skill}</span>
    </div>
  )
}
