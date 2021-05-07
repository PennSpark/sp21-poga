import * as posenet from '@tensorflow-models/posenet'

const pointRadius = 3

export const config = {
  videoWidth: 900,
  videoHeight: 700,
  flipHorizontal: true,
  algorithm: 'single-pose',
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
  minPoseConfidence: 0.1,
  minPartConfidence: 0.5,
  maxPoseDetections: 2,
  nmsRadius: 20,
  outputStride: 16,
  imageScaleFactor: 0.5,
  skeletonColor: '#ffadea',
  skeletonLineWidth: 6,
  loadingText: 'Loading...please be patient...'
}

function toTuple({x, y}) {
  return [x, y]
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
      canvasContext.fillStyle = skeletonColor
      canvasContext.fill()
    }
  })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}

/**
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
// export function drawOffsetVectors(
//     heatMapValues, offsets, outputStride, scale = 1, ctx) {
//   const offsetPoints =
//       posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

//   const heatmapData = heatMapValues.buffer().values;
//   const offsetPointsData = offsetPoints.buffer().values;

//   for (let i = 0; i < heatmapData.length; i += 2) {
//     const heatmapY = heatmapData[i] * outputStride;
//     const heatmapX = heatmapData[i + 1] * outputStride;
//     const offsetPointY = offsetPointsData[i];
//     const offsetPointX = offsetPointsData[i + 1];

//     drawSegment(
//         [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
//   }
// }

// import * as posenet from '@tensorflow-models/posenet'

// const pointRadius = 3

// export const config = {
//   videoWidth: 900,
//   videoHeight: 700,
//   flipHorizontal: true,
//   algorithm: 'single-pose',
//   showVideo: true,
//   showSkeleton: true,
//   showPoints: true,
//   minPoseConfidence: 0.1,
//   minPartConfidence: 0.5,
//   maxPoseDetections: 2,
//   nmsRadius: 20,
//   outputStride: 16,
//   imageScaleFactor: 0.5,
//   skeletonColor: '#ffadea',
//   skeletonLineWidth: 6,
//   loadingText: 'Loading...please be patient...'
// }

// function toTuple({x, y}) {
//   return [x, y]
// }

// export function drawKeyPoints(
//   keypoints,
//   minConfidence,
//   skeletonColor,
//   canvasContext,
//   scale = 1
// ) {
//   keypoints.forEach(keypoint => {
//     if (keypoint.score >= minConfidence) {
//       const {x, y} = keypoint.position
//       canvasContext.beginPath()
//       canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
//       canvasContext.fillStyle = skeletonColor
//       canvasContext.fill()
//     }
//   })
// }

// function drawSegment(
//   [firstX, firstY],
//   [nextX, nextY],
//   color,
//   lineWidth,
//   scale,
//   canvasContext
// ) {
//   canvasContext.beginPath()
//   canvasContext.moveTo(firstX * scale, firstY * scale)
//   canvasContext.lineTo(nextX * scale, nextY * scale)
//   canvasContext.lineWidth = lineWidth
//   canvasContext.strokeStyle = color
//   canvasContext.stroke()
// }

// export function drawSkeleton(
//   keypoints,
//   minConfidence,
//   color,
//   lineWidth,
//   canvasContext,
//   scale = 1
// ) {
//   const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
//     keypoints,
//     minConfidence
//   )

//   adjacentKeyPoints.forEach(keypoints => {
//     drawSegment(
//       toTuple(keypoints[0].position),
//       toTuple(keypoints[1].position),
//       color,
//       lineWidth,
//       scale,
//       canvasContext
//     )
//   })
// }

