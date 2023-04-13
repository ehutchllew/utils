COLOR_OFF="\e[0m"
GREEN="\e[0;32m"
YELLOW="\e[0;33m"

if [[ -d "dist" ]]; then
  printf "${YELLOW}Removing 'dist' directory${COLOR_OFF}\n" 
  yarn clean 1>/dev/null
fi
  printf "${GREEN}Creating 'dist' directory${COLOR_OFF}\n" 
  yarn compile 
  yarn tsc
  cp ./package.json ./LICENSE ./dist/

return 0
  
