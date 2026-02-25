export type TSkill = {
  name: string
  icon?: string
}

export type TSkillGroup = {
  category: string
  skills: TSkill[]
}
