#!/bin/sh

# send a message from github-credential-scraper to hipchat
# using https://github.com/hipchat/hipchat-cli

readonly src_location="/usr/sbin/"
readonly github_username="<insert github username here>"
readonly github_token="<insert github token here>"
readonly github_org="<insert target org here>"
readonly hipchat_room="DevOps" # should probably be an id
readonly hipchat_robot_name="github-credential-scraper"
readonly hipchat_token="<insert token here>"
readonly hipchat_color="purple"

install_hipchat_room () {
  printf "installing hipchat_room_message in %s\n" "$src_location"
  local pwd && "$pwd"="$(pwd)"
  cd "$src_location"
  curl -L https://github.com/hipchat/hipchat-cli/archive/master.tar.gz \
    | tar xz
  cd "$pwd"
}

# install hipchat message
hipchat_room_message -h 2> /dev/null
[ $? -ne 0 ] && install_hipchat_room

github-credential-scraper "$github_org" \
  -t "$github_token" \
  -u "$github_username" \
  | hipchat_room_message \
    -t "$hipchat_token" \
    -r "$hipchat_room" \
    -f "$hipchat_robot_name" \
    -c "$hipchat_color"
