import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'

const useFavorite = (projectModel, onFavorite, onSelect) => {
  const [isFavorite, setIsFavorite] = useState(projectModel.isFavorite)
  const { theme } = useSelector((state) => state.theme)
  useEffect(() => {
    const favorite = projectModel.isFavorite
    if (favorite !== isFavorite) {
      setIsFavorite(favorite)
    }
  }, [projectModel])

  const onPressFavorite = () => {
    setIsFavorite(!isFavorite)
    projectModel.isFavorite = !isFavorite
    onFavorite(projectModel.item, !isFavorite)
  }

  const onItemClick = () => {
    onSelect((isFavorite) => {
      setIsFavorite(isFavorite)
    })
  }

  return [
    onItemClick,
    <TouchableOpacity
      style={{ padding: 6 }}
      underlayColor="transparent"
      onPress={() => onPressFavorite()}>
      <FontAwesome
        name={isFavorite ? 'star' : 'star-o'}
        size={26}
        style={{ color: theme.themeColor }}
      />
    </TouchableOpacity>,
  ]
}

useFavorite.propTypes = {
  projectModel: PropTypes.object,
  onFavorite: PropTypes.func,
  onSelect: PropTypes.func,
}

export default useFavorite
